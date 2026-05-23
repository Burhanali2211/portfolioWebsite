import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import PageTransition from "./PageTransition";
import { LoadingSpinner } from "./LoadingSpinner";

// Lazy loading pages
const Index = lazy(() => import("@/pages/Index"));
const About = lazy(() => import("@/pages/About"));
const OpenSource = lazy(() => import("@/pages/OpenSource"));
const OpenSourceDetail = lazy(() => import("@/pages/OpenSourceDetail"));
const Services = lazy(() => import("@/pages/Services"));
const Resume = lazy(() => import("@/pages/Resume"));
const Connect = lazy(() => import("@/pages/Connect"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition variant="fade">
                  <Index />
                </PageTransition>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransition variant="slideRight">
                  <About />
                </PageTransition>
              }
            />
            <Route
              path="/work"
              element={
                <PageTransition variant="slideUp">
                  <OpenSource />
                </PageTransition>
              }
            />
            <Route
              path="/tools/:id"
              element={
                <PageTransition variant="slideUp">
                  <OpenSourceDetail />
                </PageTransition>
              }
            />
            <Route
              path="/services"
              element={
                <PageTransition variant="reveal">
                  <Services />
                </PageTransition>
              }
            />
            <Route
              path="/resume"
              element={
                <PageTransition variant="fade">
                  <Resume />
                </PageTransition>
              }
            />
            <Route
              path="/connect"
              element={
                <PageTransition variant="zoom">
                  <Connect />
                </PageTransition>
              }
            />
            <Route
              path="*"
              element={
                <PageTransition variant="flip">
                  <NotFound />
                </PageTransition>
              }
            />
          </Routes>
        </Suspense>
      </AnimatePresence>

    </>
  );
};

export default AnimatedRoutes;
