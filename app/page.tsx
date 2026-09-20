import Hero from "@/components/Hero";
import StepByStepGuide from "@/components/StepByStepGuide";
import CrossPlatformClients from "@/components/CrossPlatformClients";
import ArchitectureFlowGraph from "@/components/ArchitectureFlowGraph";
import ProtocolVisualizer from "@/components/ProtocolVisualizer";
import InteractivePlayground from "@/components/InteractivePlayground";
import ApiReference from "@/components/ApiReference";

export default function Home() {
  return (
    <>
      <Hero />
      <StepByStepGuide />
      <CrossPlatformClients />
      <ArchitectureFlowGraph />
      <ProtocolVisualizer />
      <InteractivePlayground />
      <ApiReference />
    </>
  );
}

