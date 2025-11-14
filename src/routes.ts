import { createRootRouteWithContext, createRoute } from "@tanstack/react-router"
import type { QueryClient } from "@tanstack/react-query"
import Layout from "./Layout"
import AboutDemo from "./pages/AboutDemo"
import Home from "./pages/Home"

export const RootRoute = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: Layout,
})

const homeRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/",
  component: Home,
})

const aboutRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/about",
  component: AboutDemo,
})

export const routeTree = RootRoute.addChildren([homeRoute, aboutRoute]) // Acá se agregan las rutas hijas
