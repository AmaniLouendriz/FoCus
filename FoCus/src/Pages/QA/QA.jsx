import './QA.css'


export const QA = ()=>{
    return(
        <div className='QADiv'>
        
            <h2 className='text-center p-2'>Questions/Answers Hub</h2>

            <div className="accordion center" id="accordionId">

                {/* first question */}
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            What does this tool track specifically ?
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show">
                        <div className="accordion-body">
                            This tool counts how many hours you spend on a task, and compares it againt what you set for yourself. It also records your facial expressions during work to detect signs of fatigue or lack of focus, so that it can provide you with the best advice. Keep in mind that you can opt in from tracking at any time using the settings gear above.
                        </div>
                    </div>
                </div>
                {/* second question */}
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            How can I trust that my data stays anonymous?
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            We are using an offline ML model, meaning your data isn't sent through the internet anywhere. It stays locally on your machine, also, we don't collect personal information. Just the tracking info specified above. If you agreed of course.
                        </div>
                    </div>
                </div>

                {/* third question */}
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            I still don't trust this AI tool
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            No worries! We understand it's tough but trust us if we say we work for your well being. Below is an explainer video to explain how everything works, by our CEO who uses this tool every single day! There is also a pdf format <strong>here</strong>.
                            <div>
                                <img className='img-fluid img-thumbnail mx-auto d-block ' src="../../../placeHolderVideo.png" alt="placeholder video"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}