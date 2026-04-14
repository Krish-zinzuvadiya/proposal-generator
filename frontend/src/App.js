import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [logo, setLogo] = useState(null);

  const [form, setForm] = useState({
    client_name: "",
    client_company: "",
    your_name: "",
    pricing: "",

    business_model_para1: "",
    business_model_para2: "",

    // Core
    cp1:"",cp2:"",cp3:"",cp4:"",cp5:"",cp6:"",cp7:"",

    // Target
    tp1:"",tp2:"",tp3:"",tp4:"",tp5:"",tp6:"",

    // Current
    current1:"",current2:"",current3:"",current4:"",

    future_vision:"",

    // Strengths
    strengths_bold1:"",strengths1:"",
    strengths_bold2:"",strengths2:"",
    strengths_bold3:"",strengths3:"",
    strengths_bold4:"",strengths4:"",

    // Growth
    growth1:"",growth2:"",growth3:"",growth4:"",growth5:"",

    // Strategy
    strategic_para:"",

    // Pillars
    cp1_bold:"",pillar1:"",
    cp2_bold:"",pillar2:"",
    cp3_bold:"",pillar3:"",
    cp4_bold:"",pillar4:"",
    cp5_bold:"",pillar5:"",

    // Months
    ...Object.fromEntries(
      Array.from({length:12},(_,i)=>[
        [`f${i+1}`,""],[`o${i+1}`,""],[`ci${i+1}`,""],[`sr${i+1}`,""]
      ]).flat()
    ),

    post:"", reel:"", story:""
  });

  const handleChange = (e) => {
    setForm({...form,[e.target.name]:e.target.value});
  };

  const generateProposal = async () => {
    const formData = new FormData();
    Object.keys(form).forEach(k=>formData.append(k,form[k]));
    if(logo) formData.append("logo",logo);

    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
    const res = await axios.post(`${apiUrl}/generate`,formData,{

      responseType:"blob",
      headers:{"Content-Type":"multipart/form-data"}
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href=url;
    link.setAttribute("download","Proposal.docx");
    link.click();
  };

  return (
    <div className="container">

      <h2>📄 Proposal Generator</h2>

      <div className="section">
        <h3>Upload Logo</h3>
        <input type="file" onChange={(e)=>setLogo(e.target.files[0])}/>
      </div>

      <div className="section">
        <h3>Client Info</h3>
        <input name="client_name" placeholder="Client Name" onChange={handleChange}/>
        <input name="client_company" placeholder="Company Name" onChange={handleChange}/>
        <input name="your_name" placeholder="Your Name" onChange={handleChange}/>
      </div>

      <div className="section">
        <h3>Business Model</h3>
        <input name="business_model_para1" placeholder="Paragraph 1"/>
        <input name="business_model_para2" placeholder="Paragraph 2"/>
      </div>

      <div className="section">
        <h3>Core Offerings</h3>
        {[1,2,3,4,5,6,7].map(i=>(
          <input key={i} name={`cp${i}`} placeholder={`Offering ${i}`} onChange={handleChange}/>
        ))}
      </div>

      <div className="section">
        <h3>Target Audience</h3>
        {[1,2,3,4,5,6].map(i=>(
          <input key={i} name={`tp${i}`} placeholder={`Target ${i}`} onChange={handleChange}/>
        ))}
      </div>

      <div className="section">
        <h3>Current Positioning</h3>
        {[1,2,3,4].map(i=>(
          <input key={i} name={`current${i}`} placeholder={`Point ${i}`} onChange={handleChange}/>
        ))}
      </div>

      <div className="section">
        <h3>Future Vision</h3>
        <textarea name="future_vision" onChange={handleChange}/>
      </div>

      <div className="section">
        <h3>Growth Opportunities</h3>
        {[1,2,3,4,5].map(i=>(
          <input key={i} name={`growth${i}`} placeholder={`Growth ${i}`} onChange={handleChange}/>
        ))}
      </div>

      <div className="section">
        <h3>Strategy</h3>
        <textarea name="strategic_para" onChange={handleChange}/>
      </div>

      <div className="section">
        <h3>Content Pillars</h3>
        {[1,2,3,4,5].map(i=>(
          <div className="row" key={i}>
            <input name={`cp${i}_bold`} placeholder="Title" onChange={handleChange}/>
            <input name={`pillar${i}`} placeholder="Description" onChange={handleChange}/>
          </div>
        ))}
      </div>

      <div className="section">
        <h3>12-Month Strategy</h3>

        <div className="month-header">
          <span>Month</span><span>Theme</span><span>Offer</span><span>Idea</span><span>Role</span>
        </div>

        {[...Array(12)].map((_,i)=>(
          <div className="month-row" key={i}>
            <b>Month {i+1}</b>
            <input name={`f${i+1}`} onChange={handleChange}/>
            <input name={`o${i+1}`} onChange={handleChange}/>
            <input name={`ci${i+1}`} onChange={handleChange}/>
            <input name={`sr${i+1}`} onChange={handleChange}/>
          </div>
        ))}
      </div>

      <div className="section">
        <h3>Deliverables</h3>
        <input name="post" placeholder="Posts"/>
        <input name="reel" placeholder="Reels"/>
        <input name="story" placeholder="Stories"/>
      </div>

      <div className="section">
        <h3>Pricing</h3>
        <input name="pricing" placeholder="Pricing"/>
      </div>

      <button onClick={generateProposal}>Generate Proposal</button>

    </div>
  );
}

export default App;