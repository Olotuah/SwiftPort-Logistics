import React, { useState } from "react";
import axios from "axios";
import API from "../config/api";

export default function Contact() {

  const [form,setForm]=useState({
    name:"",
    email:"",
    subject:"",
    message:""
  });

  const [loading,setLoading]=useState(false);
  const [success,setSuccess]=useState("");

  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();

    setLoading(true);
    setSuccess("");

    try{

      await axios.post(`${API}/api/contact`,form);

      setSuccess("Your message has been sent successfully.");

      setForm({
        name:"",
        email:"",
        subject:"",
        message:""
      });

    }catch(err){

      alert("Unable to send message.");

    }

    setLoading(false);

  }

  return(

<div className="max-w-6xl mx-auto py-20 px-6">

<div className="grid md:grid-cols-2 gap-12">

<div>

<h1 className="text-4xl font-bold mb-6">

Contact SwiftPort Logistics

</h1>

<p className="mb-8 text-gray-600">

Need assistance with your shipment?

Our support team is always happy to help.

</p>

<div className="space-y-5">

<div>

<h3 className="font-bold">

Email

</h3>

<p>

support@swiftportlogistics.org

</p>

</div>

<div>

<h3 className="font-bold">

Business

</h3>

<p>

sales@swiftportlogistics.org

</p>

</div>

<div>

<h3 className="font-bold">

Head Office

</h3>

<p>

Perth, Western Australia

</p>

</div>

</div>

</div>

<form
onSubmit={handleSubmit}
className="space-y-5 bg-white shadow-xl rounded-xl p-8">

<input

name="name"

placeholder="Your Name"

value={form.name}

onChange={handleChange}

required

className="w-full border p-3 rounded"

/>

<input

name="email"

type="email"

placeholder="Email Address"

value={form.email}

onChange={handleChange}

required

className="w-full border p-3 rounded"

/>

<input

name="subject"

placeholder="Subject"

value={form.subject}

onChange={handleChange}

required

className="w-full border p-3 rounded"

/>

<textarea

name="message"

rows="7"

placeholder="Message"

value={form.message}

onChange={handleChange}

required

className="w-full border p-3 rounded"

/>

<button

disabled={loading}

className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg">

{loading ? "Sending..." : "Send Message"}

</button>

{success && (

<p className="text-green-600">

{success}

</p>

)}

</form>

</div>

</div>

  );

}