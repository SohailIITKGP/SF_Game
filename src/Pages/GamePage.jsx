import '../styles/GamePage.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function GamePage () {
    const [uscoredata,setUscoredata]=useState();
    const [scoredata,setscoredata]=useState();
    const [maxscore,setMaxscore]=useState(0);
    const [suthtoken,setSuthtoken]=useState();
    const [sfID,setSfID]=useState();
    const findMaxValue = (arr) => Math.max(...arr);
    
// getting unity data   
useEffect(() => {
        const fetchData = async () => {
            console.log("Before API call");
            try {
                const response = await axios.get("http://localhost:8080/api/score");
                setUscoredata(response.data);
                setscoredata(response.data.scores);
                if (response.data.code === 0) {
                    console.log(response.data);
                    
                }
            } catch (err) {
                console.error("API call error", err);
            }
        };
        {
            fetchData();
        }
    }, []);

//getting max score of user
useEffect(() => {
    if (uscoredata !== undefined) {
     let userdata =localStorage.getItem("userData");
     let userDataObject = JSON.parse(userdata);
     let sfId = userDataObject.sf_id;
     setSfID(sfId);
     let authtoken = uscoredata.sfidMappedtoauthtoken[sfId];
     if (authtoken!=null){
        setSuthtoken(authtoken)
     }
     console.log(uscoredata);
     let userscorearray = uscoredata.scores[authtoken];
     const intArray = userscorearray.map((str) => parseInt(str, 10));
     let max = findMaxValue(intArray);
     setMaxscore(max);
     console.log(max);
     console.log(userscorearray);
}
}, [uscoredata,suthtoken]);

useEffect(()=>{
    
        const fetchData=async()=>{
            if (maxscore!=null){
            console.log("i am in")
            try{
                const response = await axios.post(
                    "http://localhost:8080/api/sfid2score",
                    {
                        sfId: sfID,
                        maxscore: maxscore,
                    }
                );

                if (response.data.code === 0) {
                    console.log(response.data);
                } 
            } catch (err) {
                console.log(err);
            }}
    };
    fetchData();

},[maxscore]);

useEffect(()=>{
    const fetchData=async()=>{
        try{
            const response = await axios.get("http://localhost:8080/api/score");
            if (response.data!==null && response.data!==undefined){
            setscoredata(response.data.maxscore)
        }}
        catch (err){
            console.log(err);
        }
    };

    fetchData();

},[])

console.log(scoredata);

    return (
        <>
        
            <div className="game-page-container">
            <div className='game-opacity'></div>
                <div className="gamepage-heading">
                    <h1 className="gamepage-heading-1" >Games</h1>
                    </div>
                    <div  className="Max-Score-div" >
                <div className="Max-Score" >Max Score = {maxscore}</div></div>
                <Link to="/trafficrunner" className="game-button">
                    Play Traffic Runner
                </Link>
                <div className='leaderboard'>
			<div className='leaderboardheading'>Leaderboard</div>
			<hr  className='w-full'/>
			<div className='leaderboardData'>
			<div className="index">
				<p>Rank</p>
			{/* {toparray.map((element,index)=>{
				return(<>
				<div >{(index+1)}.</div>
				</>)
			})} */}
			</div>
			<div className="SF_ID">
				<p>SF_ID</p>
			{/* {scoreres.map((scorer,index)=>{
				return(<>
				<div key={scorer.SF_ID}>{scorer.SF_ID}</div>
				</>)
			})} */}
			</div>
			<div className="Name">
				<p>Name</p>
			{/* {scoreres.map((scorer,index)=>{
				return(<>
				<div key={scorer.SF_ID}>{scorer.Name}</div>
				</>)
			})} */}
			</div>
			<div className="Score">
				<p>Score</p>
			{/* {scoreres.map((scorer,index)=>{
				return(<>
				<div key={scorer.SF_ID}>{scorer.Score}</div>
				</>)
			})} */}
			</div>
			</div>
		</div>
	</div>
        </>
    );
};