import Header from "../Header"
import Working from "@assets/working.jpg"

function Home () {
    return (
        <div style={{height: "100vh", display: "flex", flexDirection: "column"}}>
            <Header />
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden"
            }}>
                <h1
                style={{
                    position:"absolute",
                    left:"50%",
                    top:"50%",
                    color:"#fff",
                    fontSize:"3rem",
                    transform:"TranslateX(-50%)"
                }}
                >
                  Home Under Development...</h1>
                <img 
                    style={{width: "100%", height: "100%", objectFit: "cover"}} 
                    src={Working} 
                    alt="" 
                />
            </div>
        </div>
    );
}

export default Home ;