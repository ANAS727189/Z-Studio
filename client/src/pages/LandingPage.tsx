import {
    HeroSection,
    ShowCase,
    Features,
    AboutUs,
    CTA,
    Footer,
    Navbar
} from "../components/page.ts"

const LandingPage = () => {
  return (
    <>
    <Navbar />
    <HeroSection />
    <ShowCase />
    <Features />
    <AboutUs />
    <CTA />
    <Footer />
    </>
  )
}

export default LandingPage