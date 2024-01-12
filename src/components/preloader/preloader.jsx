import React from "react";

const Preloader = () => {
	return (
		<div
			className="preloader-desktop"
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<div style={{ height: "70%" }}>
				<video
					autoPlay
					muted
					src="./ILU.mp4"
					height="{500}"
					style={{ height: "100%", width: "100%" }}
				></video>
			</div>
			<div
				className="loading"
				style={{
					cursor: "pointer",
					display: "flex",
					justifyContent: "space-around",
					alignItems: "center",
					width: "600px",
				}}
			>
				<div
					onClick={() => {
						document.getElementsByClassName(
							"preloader-desktop"
						)[0].style.display = "none";
					}}
					style={{
						width: "200px",
						height: "50px",
						background : "none",
						fontSize:"2.5rem",
						fontFamily : "gemstone",
						textAlign:"center"
					}}
				>
					Enter in 2D
				</div>
				<div
					onClick={() => {
						window.location.href = "https://3d.springfest.in";
					}}
					style={{
						width: "200px",
						height: "50px",
						background : "none",
						fontSize:"2.5rem",
						fontFamily : "gemstone",
						textAlign:"center",
					}}
				>
					Enter in 3D
				</div>
			</div>
		</div>
	);
};

export default Preloader;
