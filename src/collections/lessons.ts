import {defineCollection, z} from 'astro:content';
import {glob} from 'astro/loaders';
import simManifest from '../generated/sim/manifest.json';

// Lessons under /learn/. `scenario`, `rtos` and `keyStep` are checked against the
// manifest written by the simulator export, so a lesson cannot refer to
// something the exported simulator does not have.
const simScenarios: Record<string, {title: string; rtos: string[]}> = simManifest.scenarios;
const simRtos = z.enum(Object.keys(simManifest.kernels) as [string, ...string[]]);

export const lessons = defineCollection({
  loader: glob({pattern: "**/*.md", base: "./src/content/lessons"}),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    scenario: z.string().optional(),
    // One RTOS, or several for compare pages.
    rtos: z.union([simRtos, z.array(simRtos).min(1)]).transform(v => Array.isArray(v) ? v : [v]).optional(),
    // The moment drawn as the static SVG (read by the simulator export).
    keyStep: z.object({
      event: z.enum(simManifest.events as [string, ...string[]]),
      nth: z.number().int().min(1).default(1),
    }).optional(),
  }).superRefine((data, ctx) => {
    if (data.scenario === undefined) {
      if (data.rtos || data.keyStep) {
        ctx.addIssue({code: 'custom', message: '`rtos` and `keyStep` need a `scenario`'});
      }
      return;
    }
    const scenario = simScenarios[data.scenario];
    if (!scenario) {
      ctx.addIssue({
        code: 'custom',
        path: ['scenario'],
        message: `Unknown scenario "${data.scenario}". The exported simulator has: ${Object.keys(simScenarios).join(', ')}`,
      });
      return;
    }
    if (!data.rtos) {
      ctx.addIssue({code: 'custom', path: ['rtos'], message: 'A lesson with a `scenario` needs `rtos`'});
      return;
    }
    for (const rtos of data.rtos) {
      if (!scenario.rtos.includes(rtos)) {
        ctx.addIssue({
          code: 'custom',
          path: ['rtos'],
          message: `Scenario "${data.scenario}" is not available for "${rtos}"`,
        });
      }
    }
  }),
});
