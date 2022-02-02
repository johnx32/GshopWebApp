import Navbar from "../components/Navbar"
import Aside from "../components/Aside"
import Footer from "../components/Footer"
import ContentW from "../components/ContentW";
import ContentWrapper from "../components/ContentWrapper";


export default function Dashboard(props) {
    return (<>
        <Navbar />

        <Aside />

        <ContentW>
            {props.children}
        </ContentW> 
        {/* <ContentWrapper/> */}

        <Footer />
    </>)
}