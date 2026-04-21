import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { Title } from "@solidjs/meta";
import "./app.css";

export default function App() {
  return (
    <Router
      root={(props) => (
        <>
          <Title>App</Title>
          <nav class="border-b border-gray-200 bg-white px-6 py-4">
            <div class="mx-auto flex max-w-6xl items-center justify-between">
              <a href="/" class="text-xl font-bold text-gray-900">
                App
              </a>
              <div class="flex gap-6">
                <a href="/" class="text-gray-600 hover:text-gray-900">
                  Home
                </a>
              </div>
            </div>
          </nav>
          <main class="mx-auto max-w-6xl px-6 py-8">
            <Suspense
              fallback={
                <div class="flex items-center justify-center py-12">
                  <div class="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
                </div>
              }
            >
              {props.children}
            </Suspense>
          </main>
          <footer class="border-t border-gray-200 bg-gray-50 px-6 py-6 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} App. All rights reserved.
          </footer>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
