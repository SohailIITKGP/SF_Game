import React, { useState } from "react";
import faqs from "../utils/faq.js";
import "../styles/Faq.css";

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Faq = () => {
	const [isOpen, setIsOpen] = useState(Array(faqs.length).fill(false));

	const toggleFaq = (index) => {
		const newIsOpen = [...isOpen];
		newIsOpen[index] = !newIsOpen[index];
		setIsOpen(newIsOpen);
	};

	return (
		<>
			<div className="faqmodal-parent-container">
				<div className="faq-container">
					<div className="faqheading-of-modal">
						<p className="faqheading-modal-p">FAQ's</p>
					</div>
					{faqs.map((faq, index) => {
						return (
							<div className="faq-modal-content" key={index}>
								<div className="faqFull">
									<div
										className={isOpen[index] ? "faq-minus" : "faq-plus"}
										onClick={() => toggleFaq(index)}
									>
										<ChevronRightIcon className={`faq-icon ${isOpen[index] && "rotate-icon"}`}/>
									</div>
									<div className="faqmodal-external-content">
										<div
											className="question-faq"
											onClick={() => toggleFaq(index)}
										>
											{faq.ques}
										</div>
										<div
											className={`answerfaq ${isOpen[index] ? "answerfaq-open" : ""
												}`}
										>
											{faq.ans}
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default Faq;
