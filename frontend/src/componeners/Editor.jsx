import { useState ,useEffect} from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"

import prism, { highlight } from "prismjs"
import '../assets/style/EditorContainer.css'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
const EditorContainer=()=>{
    const [code, setCode] = useState('funtion fun(){ \n///write your code here\n  console.log("Hello World")\n}\n\nfun();')
  const [review, setReview] = useState('')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    prism.highlightAll()
  },)
  const postRequest=async()=>{
    setLoading(true);
   
    try{
    const response = await axios.post('http://localhost:3000/ai/get-review', {code})
    setReview(response.data);}
    catch(error){
      console.error("Error fetching review:", error);
      setReview("An error occurred while fetching the review.");
    }
    finally{
      setLoading(false);
    }}
    return <>
     <header>
      <h2>Ai powerd code Reviewer</h2>
    </header>
      <main>
        
        <div className="left">
          <div className="code">
           
                {<Editor
                  value={code}
                  onValueChange={code => setCode(code)}
                  highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript',prism.languages.python,'python')}
                  padding={10}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                   
                    backgroundColor: '#000000',
                    color: '#f8f8f2',
                    height:"100%",
                    width:"100%",
                    fontsize: "90px",
                  }}
                 
                  />  
                  }
              
          </div>
          <div className="review" onClick={postRequest}>Review</div>
        </div>
        <div className="right">
                  <h1>Code Review</h1>

        { loading?"Loading....":<ReactMarkdown>{review}</ReactMarkdown>  }
        </div>
      </main>
    </>
}
export default EditorContainer;