<script lang="ts">
  import "../app.css";
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
  import { Toaster } from "$lib/components/ui/sonner";

  const queryClient = new QueryClient();
</script>

<Toaster position="top-right" />

<QueryClientProvider client={queryClient}>
  <slot></slot>
</QueryClientProvider>
<footer class="text-center fixed w-full bottom-0.5">
  <a
    href="https://ptsgrn.dev"
    class="text-xs opacity-30 hover:opacity-100 font-bold tracking-tighter transition-all rounded duration-100 font-mono hover:bg-clip-text bg-gradient-to-r from-green-500 via-purple-400 to-fuchsia-400 text-transparent hover backdrop-filter -backdrop-hue-rotate-90"
  >
    ptsgrn.dev</a
  >
</footer>
