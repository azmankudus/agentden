import { Title } from "@solidjs/meta";
import { Icon } from "@iconify-icon/solid";
import { For } from "solid-js";

const features = [
  {
    icon: "lucide:zap",
    title: "Lightning Fast",
    description:
      "Built on SolidJS fine-grained reactivity for optimal performance.",
  },
  {
    icon: "lucide:shield-check",
    title: "Type Safe",
    description: "Full TypeScript strict mode with end-to-end type safety.",
  },
  {
    icon: "lucide:palette",
    title: "Modern Styling",
    description:
      "TailwindCSS 4 with CSS-first configuration and custom themes.",
  },
];

export default function Home() {
  return (
    <>
      <Title>Home - App</Title>
      <div class="py-12">
        <div class="mx-auto max-w-3xl text-center">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900">
            Welcome to App
          </h1>
          <p class="mt-4 text-lg text-gray-600">
            A modern full-stack application built with SolidJS and Micronaut.
          </p>
        </div>
        <div class="mt-16 grid gap-8 sm:grid-cols-3">
          <For each={features}>
            {(feature) => (
              <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50">
                  <Icon
                    icon={feature.icon}
                    class="text-2xl text-primary-600"
                  />
                </div>
                <h3 class="text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p class="mt-2 text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            )}
          </For>
        </div>
      </div>
    </>
  );
}
