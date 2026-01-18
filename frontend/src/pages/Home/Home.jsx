import HomeHero from "../../components/Home/HomeHero";
import HomeCatalog from "../../components/Home/HomeCatalog";
import HomeFooter from "../../components/Home/HomeFooter";
import "../../components/Home/Home.css";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeCatalog />
      <HomeFooter />
    </>
  );
}
