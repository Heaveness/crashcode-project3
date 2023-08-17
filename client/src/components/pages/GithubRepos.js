import React from 'react';
import { FaGithub } from "react-icons/fa";

function Repos() {
    return (
    <div className="repos">
        <h3>Want to know more about the dev team?</h3>
        <h5>Click the repo links below to see our projects!</h5>
        <p><a href='https://github.com/Abhidesai508' ><FaGithub size={30}/></a> Abhidesai508</p>
        <p><a href='https://github.com/kimmh891223' ><FaGithub size={30}/></a> kimmh891223</p>
        <p><a href='https://github.com/Heaveness' ><FaGithub size={30}/> </a> Heaveness</p>
        <p><a href='https://github.com/AliceLiu1218' ><FaGithub size={30}/> </a> AliceLiu1218</p>
        <p><a href='https://github.com/caballero-r' ><FaGithub size={30}/></a> caballero-r</p>
    </div>  
)  
}

export default Repos;