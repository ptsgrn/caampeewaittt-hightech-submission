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
