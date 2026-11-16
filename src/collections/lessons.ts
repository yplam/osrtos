import {defineCollection, z} from 'astro:content';
import {glob} from 'astro/loaders';
import simManifest from '../generated/sim/manifest.json';

// Lessons under /learn/. `scenario`, `rtos` and `keyStep` are checked against the
// manifest written by the simulator export, so a lesson cannot refer to
// something the exported simulator does not have.
const simScenarios: Record<string, {title: string; rtos: string[]; tweakable: string[]}> = simManifest.scenarios;
const simRtos = z.enum(Object.keys(simManifest.kernels) as [string, ...string[]]);

export const lessons = defineCollection({
  loader: glob({pattern: "**/*.md", base: "./src/content/lessons"}),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Position inside the lesson's section (see lesson-nav.ts). Lessons without one come last, by title.
    order: z.number().int().optional(),
    scenario: z.string().optional(),
    // One RTOS, or several: the reader chooses with the simulator's switch.
    rtos: z.union([simRtos, z.array(simRtos).min(1)]).transform(v => Array.isArray(v) ? v : [v]).optional(),
    // The moment drawn as the static SVG (read by the simulator export).
    keyStep: z.object({
      event: z.enum(simManifest.events as [string, ...string[]]),
      nth: z.number().int().min(1).default(1),
    }).optional(),
    // Parameters the simulator opens with, by tweak path: { "tasks[Low].urgency": 2 }.
    // The export checks the values by running the scenario with them.
    params: z.record(z.string(), z.union([z.number(), z.boolean(), z.string()])).optional(),
  }).superRefine((data, ctx) => {
    if (data.scenario === undefined) {
      if (data.rtos || data.keyStep || data.params) {
        ctx.addIssue({code: 'custom', message: '`rtos`, `keyStep` and `params` need a `scenario`'});
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
    for (const path of Object.keys(data.params ?? {})) {
      if (!scenario.tweakable.includes(path)) {
        ctx.addIssue({
          code: 'custom',
          path: ['params', path],
          message: `"${path}" is not a parameter of scenario "${data.scenario}". It has: ${scenario.tweakable.join(', ')}`,
        });
      }
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
