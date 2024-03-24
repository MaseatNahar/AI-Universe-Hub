const loadAiTools = async () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();
  displayAiTools(data.data.tools, 6);
  document
    .getElementById("btn-show-more")
    .addEventListener("click", function () {
      displayAiTools(data.data.tools, data.data.tools.length);
    });
};
const displayAiTools = (tools, limit) => {
  const toolsContainer = document.getElementById("tools-container");
  const showMore = document.getElementById("show-more");
  let temp = tools.slice(); // Create a copy of the 'tools' array
  console.log("tools", tools, limit);
  if (tools.length > limit) {
    temp = temp.slice(0, limit); // Use slice to get a portion of the array without modifying it
    showMore.classList.remove("d-none");
  } else {
    showMore.classList.add("d-none");
  }
  console.log("temp", temp);
  toolsContainer.innerHTML = "";
  temp.forEach((tool) => {
    const toolDiv = document.createElement("div");
    toolDiv.classList.add("col");
    toolDiv.innerHTML = ` <div class="card h-100 p-3">
       <img src="${tool.image}" class="card-img-top" alt="...">
       <div class="features" >
       <h4> Features</h4>
        ${tool?.features
          ?.map((id, feature) => ` ${feature}. ${id}<br>`)
          .join("")}
       </div>
       <hr>
        <div class="card-body d-flex justify-content-between">
           <div> 
             <h5 class="card-title">${tool.name}</h5> 
             <img src="./calendar.svg" alt="Calendar Icon" height="20" width="20">
             <h6>${tool.published_in}</h6>
           </div>
          
           <div class="mt-3 ">
           <img onclick="loadDetails('${
             tool.id
           }')" src="./arroimg.png" alt="Calendar Icon" height="30" width="30" data-bs-toggle="modal" data-bs-target="#exampleModal"/>
           
           </div>
        </div>
      </div>
        `;
    toolsContainer.appendChild(toolDiv);
  });
};

const loadDetails = async (id) => {
  console.log(id);
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log("mmm", data);
 const modalContent=document.getElementById("modalContainer")
 const modalDetails=document.createElement("div");
 modalContent.innerHTML="";
 modalDetails.innerHTML=`<div class="modal-content">
 <div class="modal-header">
   <h1 class="modal-title fs-5" id="exampleModalLabel">${data?.data?.tool_name}</h1>
   <button
     type="button"
     class="btn-close"
     data-bs-dismiss="modal"
     aria-label="Close"
   ></button>
 </div>
 <div class="modal-body"> 
 <div> <img src=${data?.data?.image_link[0]} class="card-img-top" alt="..."> </div>
 </div>
 <div class="modal-footer">
   <button
     type="button"
     class="btn btn-secondary"
     data-bs-dismiss="modal"
   >
     Close
   </button>
 </div>
</div>`
modalContent.appendChild(modalDetails);
};
// const displayToolDetails = (tool) =>{
//   console.log(tool);
// }


loadAiTools();

//onclick="loadDetails(${JSON.stringify(tool.links)})"
