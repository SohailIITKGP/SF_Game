import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import faqs from "../utils/faq.js";

import '../styles/faqbeta.css'


const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `0px solid #00000080`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', color: "white" }} />}
    {...props}
  />
)) (({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0)',
  color: 'white',
  backdropFilter: 'blur(7px)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '0px solid rgba(0, 0, 0, .125)',
  backgroundColor: "#1f1f1f",
  color: "white"
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className='faqs-container'>
      <div className='faqs-heading'>
        <h1>FAQs</h1>
      </div>

      {
        faqs.map((faq, index) => {
          return (
            <Accordion expanded={expanded === faq.id} onChange={handleChange(faq.id)} >
              <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" className="accordion-box">
                <Typography>
                  {faq.ques}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className='accordion-item'>
                <Typography>
                  {faq.ans}
                </Typography>
              </AccordionDetails>
            </Accordion>
          )
        })
      }
    </div>
  );
}