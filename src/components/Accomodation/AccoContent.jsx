import Card from "./AccoCard";
import details from "../../utils/Acco_details";
import "../../styles/Accomodation.css";

const AccomodationContent = ({ mainheading }) => {
  const selectedDetails = details.find(
    (detail) => detail.mainheading === mainheading
  );

  if (!selectedDetails) {
    return null;
  }

  const { content } = selectedDetails;

  return (
    <div className="Acco_content">
      <h3>{mainheading}</h3>
      <div className="Acco_cards">
        {content.map((item) => (
          <Card key={item.id} {...item} />
        ))}

        {/* {mainheading === "REACHING IIT KGP" && (
                    <div className="contingent-buttons">
                        <button>
                            <a
                                rel="noreferrer"
                                style={{
                                    textDecoration: "none",
                                    color: "white",
                                }}
                                target="_blank"
                                href="https://www.google.com/maps/place/Indian+Institute+of+Technology,+Kharagpur/@22.3149323,87.3079508,17z/data=!3m1!4b1!4m6!3m5!1s0x3a1d440255555547:0x6f2f20dd0c0d6793!8m2!3d22.3149274!4d87.3105311!16zL20vMDFyMm5n?entry=ttu"
                            >
                                View in Maps
                            </a>
                        </button>
                    </div>
                )} */}

        {mainheading === "REACHING IIT KGP" && (
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.0241235532485!2d87.31053109999999!3d22.314927399999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1d440255555547%3A0x6f2f20dd0c0d6793!2sIndian%20Institute%20of%20Technology%2C%20Kharagpur!5e0!3m2!1sen!2sin!4v1704928696524!5m2!1sen!2sin"
            width="600"
            height="450"
            title="map"
            style={{
              border: "0",
              borderRadius: "10px",
              margin: "0 auto",
              width: "100%",
            }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default AccomodationContent;
