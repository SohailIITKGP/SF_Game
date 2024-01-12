const AccoCard = ({ id, subheading, subcontent }) => {
    const subcontentLines = subcontent
        .split("\n")
        .map((line, index) => <p key={index}>{line.trim()}</p>);
    return (
        <div className="acco_card" key={id}>
            <div className="acco_card_heading">{subheading}</div>
            <div className="acco_card_content">{subcontentLines}</div>
        </div>
    );
};
export default AccoCard;
