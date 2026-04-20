import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [logo, setLogo] = useState(null);
  const [copied, setCopied] = useState(false);

  const [form, setForm] = useState({
    client_name: "",
    client_company: "",
    your_name: "",
    pricing: "",
    validity: "",

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

    // Deliverables
    post:"", reel:"", story:""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ✅ FIXED COPY FUNCTION (OUTSIDE)
  const handleCopy = () => {
    const promptText = `Act as a Senior Digital Marketing Strategist.

I will provide you:

Company Name: 
Website: 

Generate a month-wise social media strategy table for [Enter Month] focused on reels content and follower growth.

Your task is to write a Business Model section for a premium proposal.

Write in exactly 2 paragraphs only.

Instructions:
Maintain a professional, agency-level tone
Keep language clear, structured, and non-generic
Do not copy content — analyze and write business-specific insights
Avoid long sentences
Structure:

Paragraph 1:
Explain the business model including type (service/manufacturing), B2B/B2C nature, core operations, and how the business delivers its services/products.

Paragraph 2:
Explain infrastructure and operational strength including systems, processes, quality control, and how the business ensures consistency and reliability.

Output Rules:
No headings
No bullet points
Only 2 paragraphs
Each paragraph short and clean (3–4 lines max)


---------------------------------------------------------------

Core Offerings

Write 6–8 bullet points covering:

Main services or products offered
Keep points short, clear, and industry-specific
Target Audience

Write 6–8 bullet points covering:

Key customer segments (B2B + B2C if applicable)
Focus on real buyers
Instructions
Use bullet format only (•)
Each point one line
Keep it short and clean
Avoid repetition
Output Rules
First Core Offerings
Then Target Audience
Clean proposal format

--------------------------------------------------------------

### **Current Positioning**

Write 3–4 short bullet points describing:

* How the brand is currently positioned
* Focus on operations, branding, and digital presence

---

### **Future Positioning (The Vision)**

Write:

* One line: “[Company Name] can evolve into:”
* Then one strong positioning statement (1 line)

---

### **Instructions**

* Keep points short (one line each)
* Be specific, not generic
* Maintain strategic tone
* No long explanations

---

### **Output Rules**

* First Current Positioning (with bullets)
* Then Future Positioning (1 statement)
* Clean and premium format

--------------------------------------------------------------

### **Strengths**

Write 4–5 bullet points in this format:

**Heading:** Short explanation (one line)

---

### **Instructions**

* Each point must have:

  * A short heading
  * One-line explanation
* Keep it concise and structured
* Focus on real business strengths (services, demand, scalability, audience)
* Avoid long sentences

---

### **Output Rules**

* Use bullet format
* Keep it clean and proposal-ready
* No extra explanation

--------------------------------------------------------------

### **Opportunities for Growth**

### **Content Gaps:**

Write 5–6 bullet points covering:

* Key gaps in branding, content, and marketing
* Focus on growth opportunities

---

### **Instructions**

* Keep each point short (one line)
* Use clear and simple wording
* Focus on gaps, not strengths
* Avoid explanations

---

### **Output Rules**

* Use bullet format (•)
* Clean and structured
* Proposal-ready format

--------------------------------------------------------------

### **Business Goals (Paragraph Format)**

Write one strong paragraph in this style:

“Establish [Company Name] as a [brand positioning] while generating consistent [lead type], strengthening trust through [key strengths], increasing visibility in [target market], and improving conversions through [content/strategy approach].”

---

### **Instructions**

* Follow the **exact sentence structure**
* Replace only:

  * Company Name
  * Industry-specific positioning
  * Lead type (B2B / B2C / both)
  * Trust factors (quality, service, expertise, etc.)
  * Target market
  * Content/strategy approach
* Keep it in **one paragraph only**
* Do not change tone or flow

---

### **Output Rules**

* One paragraph only
* Same format every time
* Clean, premium, proposal-ready

--------------------------------------------------------------

### **Content Pillars (Fixed Format)**

Write 5 points in this exact format:

1. **[Pillar Title]:** [3–5 word explanation]

---

### **Instructions**

* Keep **exactly 5 pillars**
* Each explanation must be **very short (3–5 words)**
* Use **industry-relevant titles**
* Maintain same structure every time
* Do not write long descriptions

---

### **Output Rules**

* Numbered format (1 to 5)
* One line per point
* Clean and consistent formatting


--------------------------------------------------------------

### **Advanced Month-wise Strategy Table**

Create a **premium 6–12 month strategy table** in this format:

| Month | Focus Theme | Campaign / Offer | Content Ideas | Special Roles |

---

### **Instructions**

* Generate strategy for **[X months]**
* Keep tone **premium, strategic, and brand-focused**
* Each month should feel like a **campaign, not random content**

---

### **Column Guidelines**

**Month:**

* Use “Month 1, Month 2…” format

**Focus Theme:**

* Use only **brand or content themes** (e.g., Digital Foundation, Product Depth, Global Reach, Trust, Seasonal, Innovation)
* ❌ Do NOT use goals like Lead Generation, Sales, Conversion (in focus theme row)

**Campaign / Offer:**

* Give a **campaign-style name** (2–4 words, premium sounding)

**Content Ideas:**

* 1–2 strong content directions (short but meaningful)

**Special Roles:**

* Assign a role (e.g., Strategy Lead, Content Creator, Social Media Manager)

---

### **Rules**

* Make it **campaign-driven, not basic**
* Focus Theme must be **creative/strategic, not performance-based**
* Avoid generic words like “posting”
* Align with business type
* Follow flow:

  * Early months: Awareness & Reach
  * Mid months: Engagement & Authority
  * Later months: Trust & Growth

---

### **Output Rules**

* Table only
* Clean formatting
* No extra explanation



`;

    navigator.clipboard.writeText(promptText);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const generateProposal = async () => {
    try {
      const formData = new FormData();

      Object.keys(form).forEach(key => {
        formData.append(key, form[key] || "");
      });

      if (logo) {
        formData.append("logo", logo);
      }

      const apiUrl = "http://127.0.0.1:5000";

      const res = await axios.post(`${apiUrl}/generate`, formData, {
        responseType: "blob"
      });

      const safeName = (form.client_company || "Client")
        .replace(/[^a-z0-9 ]/gi, "")
        .trim();

      const fileName = `Complete Branding & Marketing Proposal for ${safeName} V1.0.docx`;

      const file = new File([res.data], fileName, {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      });

      const url = window.URL.createObjectURL(file);

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();

    } catch (err) {
  console.error("FULL ERROR:", err);

  if (err.response && err.response.data) {
    const reader = new FileReader();

    reader.onload = () => {
      alert(reader.result); // 🔥 real error message
    };

    reader.readAsText(err.response.data);
  } else {
    alert(err.message);
  }
}
  };

  return (
    <div className="app-wrapper">
    <div className="container">

      <h2>Proposal Generator</h2>

      <div className="copy-global">
      <button className="copy-btn" onClick={handleCopy}>
        {copied ? "Copied ✅" : "Copy Prompt"}
      </button>
    </div>
      {/* LOGO + COPY BUTTON */}
      <div className="section">

          
        <div className="section-header">
          <h3>Upload Logo</h3>
        </div>

        <input type="file" onChange={(e)=>setLogo(e.target.files[0])}/>
      </div>

      {/* CLIENT */}
      <div className="section">
        <h3>Client Info</h3>
        <input name="client_name" placeholder="Client Name" onChange={handleChange}/>
        <input name="client_company" placeholder="Company Name" onChange={handleChange}/>
        <input name="your_name" placeholder="Your Name" onChange={handleChange}/>
      </div>

      {/* BUSINESS MODEL */}
      <div className="section">
        <h3>Business Model</h3>
        <input name="business_model_para1" placeholder="Paragraph 1" onChange={handleChange}/>
        <input name="business_model_para2" placeholder="Paragraph 2" onChange={handleChange}/>
      </div>

      {/* CORE */}
      <div className="section">
        <h3>Core Offerings</h3>
        {[1,2,3,4,5,6,7].map(i=>(
          <input key={i} name={`cp${i}`} placeholder={`Offering ${i}`} onChange={handleChange}/>
        ))}
      </div>

      {/* TARGET */}
      <div className="section">
        <h3>Target Audience</h3>
        {[1,2,3,4,5,6].map(i=>(
          <input key={i} name={`tp${i}`} placeholder={`Target ${i}`} onChange={handleChange}/>
        ))}
      </div>

      {/* CURRENT */}
      <div className="section">
        <h3>Current Positioning</h3>
        {[1,2,3,4].map(i=>(
          <input key={i} name={`current${i}`} placeholder={`Point ${i}`} onChange={handleChange}/>
        ))}
      </div>

      {/* FUTURE */}
      <div className="section">
        <h3>Future Positioning (The Vision)</h3>
        <textarea name="future_vision" onChange={handleChange}/>
      </div>

      <div className="section">
        Understanding Market Position & Potential Growth 👇
      </div>

      {/* STRENGTHS */}
      <div className="section">
        <h3>Strengths</h3>
        {[1,2,3,4].map(i=>(
          <div className="row" key={i}>
            <input name={`strengths_bold${i}`} placeholder="Title" onChange={handleChange}/>
            <input name={`strengths${i}`} placeholder="Description" onChange={handleChange}/>
          </div>
        ))}
      </div>

      {/* GROWTH */}
      <div className="section">
        <h3>Opportunities for Growth | Content Gaps</h3>
        {[1,2,3,4,5].map(i=>(
          <input key={i} name={`growth${i}`} placeholder={`Growth ${i}`} onChange={handleChange}/>
        ))}
      </div>

      <div className="section">
        Branding & Marketing – Strategic Growth Plan 👇
      </div>

      {/* STRATEGY */}
      <div className="section">
        <h3>Business Goals</h3>
        <textarea name="strategic_para" onChange={handleChange}/>
      </div>

      {/* PILLARS */}
      <div className="section">
        <h3>Content Pillars</h3>
        {[1,2,3,4,5].map(i=>(
          <div className="row" key={i}>
            <input name={`cp${i}_bold`} placeholder="Title" onChange={handleChange}/>
            <input name={`pillar${i}`} placeholder="Description" onChange={handleChange}/>
          </div>
        ))}
      </div>

      {/* MONTHS */}
      <div className="section">
        <h3>Month By Month Strategy & Ideas </h3>

        <div className="month-header">
          <span>Month</span>
          <span>Theme</span>
          <span>Offer</span>
          <span>Idea</span>
          <span>Role</span>
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

      {/* DELIVERABLES */}
      <div className="section">
        <h3>Deliverables</h3>
        <input name="post" placeholder="Posts" onChange={handleChange}/>
        <input name="reel" placeholder="Reels" onChange={handleChange}/>
        <input name="story" placeholder="Stories" onChange={handleChange}/>
      </div>

      {/* PRICING */}
      <div className="section">
        <h3>Pricing</h3>
        <input name="pricing" placeholder="Pricing" onChange={handleChange}/>
      </div>

      {/* VALIDITY */}
      <div className="section">
        <h3>Validity</h3>
        <input name="validity" placeholder="Validity (Ex: 6 Months) | Only Numbers" onChange={handleChange}/>
      </div>

      <button onClick={generateProposal}>
        Generate Proposal
      </button>
    </div>

    <div className="footer">
    Designed & Developed by Krish for Arowians ✨
  </div>
    </div>
  );
}

export default App;