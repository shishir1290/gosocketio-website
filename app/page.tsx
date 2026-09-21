import Hero from "@/components/Hero";
import StepByStepGuide from "@/components/StepByStepGuide";
import CrossPlatformClients from "@/components/CrossPlatformClients";
import ComparisonTable from "@/components/ComparisonTable";
import ArchitectureFlowGraph from "@/components/ArchitectureFlowGraph";
import ProtocolVisualizer from "@/components/ProtocolVisualizer";
import InteractivePlayground from "@/components/InteractivePlayground";
import ApiReference from "@/components/ApiReference";
import FaqSection from "@/components/FaqSection";

export default function Home() {
  return (
    <>
      <Hero />
      <StepByStepGuide />
      <CrossPlatformClients />
      <ComparisonTable />
      <ArchitectureFlowGraph />
      <ProtocolVisualizer />
      <InteractivePlayground />
      <ApiReference />
      <FaqSection />
    </>
  );
}
