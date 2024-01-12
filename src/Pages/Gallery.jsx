import React, { useEffect, useRef } from "react";
import imageData from "../utils/img_data_gallery.js";
import "../styles/Gallery.css";

const Gallery = () => {
	const progressRef = useRef(0);
	const intervalIdRef = useRef(null);
	const itemsRef = useRef([]);
	const imageZoomed = useRef(false);
	const speedWheel = 0.02;
	const autoScrollInterval = 200;

	const getZIndex = (array, index) =>
		array.map((_, i) =>
			index === i ? array.length : array.length - Math.abs(index - i)
		);

	const displayItems = (item, index, active) => {
		const zIndex = getZIndex(itemsRef.current, active)[index];
		item.style.setProperty("--zIndex", zIndex);
		item.style.setProperty(
			"--active",
			(index - active) / itemsRef.current.length
		);
	};

	const animate = () => {
		progressRef.current += 1;
		progressRef.current = progressRef.current > 100 ? 0 : progressRef.current;
		const active = Math.floor(
			(progressRef.current / 100) * (itemsRef.current.length - 1)
		);

		itemsRef.current.forEach((item, index) =>
			displayItems(item, index, active)
		);
	};

	const stopAutoScroll = () => {
		clearInterval(intervalIdRef.current);
		intervalIdRef.current = null;
	};

	const startAutoScroll = () => {
		stopAutoScroll();
		intervalIdRef.current = setInterval(animate, autoScrollInterval);
	};

	const zoomImage = () => {
		stopAutoScroll();
		const active = Math.floor(
			(progressRef.current / 100) * (itemsRef.current.length - 1)
		);
		const item = document.querySelectorAll(".carousel-item")[active];

		if (!imageZoomed.current) {
			imageZoomed.current = true;
			stopAutoScroll();

			item.style.setProperty("--width", "95vw");
			item.style.setProperty("--height", "70vh");
		} else {
			imageZoomed.current = false;
			startAutoScroll();

			item.style.setProperty("--width", "clamp(220px, 30vw, 300px)");
			item.style.setProperty("--height", "clamp(300px, 40vw, 400px)");
		}
	};

	useEffect(() => {
		itemsRef.current = Array.from(document.querySelectorAll(".carousel-item"));

		document.addEventListener("mousewheel", (e) => {
			const wheelProgress = e.deltaY * speedWheel;
			progressRef.current += wheelProgress;
			animate();
			stopAutoScroll();
		});

		let startX;

		document.addEventListener("touchstart", (e) => {
			stopAutoScroll();
			if (imageZoomed.current) return;
			startX = e.changedTouches[0].clientX;
		});

		document.addEventListener("touchend", (e) => {
			if (imageZoomed.current) return;

			let endX = e.changedTouches[0].clientX;
			let dist = startX - endX;
			const touchProgress = dist * 0.08;

			progressRef.current += touchProgress;
			animate();
			startAutoScroll();
		});

		startAutoScroll();

		return () => {
			clearInterval(intervalIdRef.current);
			intervalIdRef.current = null;
		};
	}, []);

	return (
		<div className="carousel">
			<h1 className="carousel-heading">Gallery</h1>
			{imageData.map((item, index) => (
				<div className="carousel-item" key={"IMG" + index} onClick={zoomImage}>
					<div className="carousel-box">
						<img src={item} alt="" />
					</div>
				</div>
			))}
		</div>
	);
};

export default Gallery;
