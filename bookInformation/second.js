async function searchBook(name) {
  var responseContainer;
  let nameArr = name.split(" ");
  let resultingName = nameArr.join("+");
  console.log("going to specified url");
  await fetch(`https://openlibrary.org/search.json?q=${resultingName}`)
    .then((httpResponse) => {
      let response = new Response();
      response = httpResponse;
      return response.json();
    })
    .then((json) => (responseContainer = json));
  function showResponse(resp) {
    let arrayToRetrieve = [];
    let docsObject = null;
    for (const [key, value] of Object.entries(resp)) {
      if (`${key}` === `numFound`) {
        arrayToRetrieve.push({ numFound: `${value}` });
      }
      if (key === "docs") {
        let obj = value;
        for (item of obj) {
          let bookObject = {
            Title: item["title"],
            Author: item["author_name"],
            First_Publish_Year: item["first_publish_year"],
            Subject: item["subject"].split(" "),
          };
          arrayToRetrieve.push(bookObject);
        }
        // objectToRetrieve["Title"] = objArr[0]["title"];
        // objectToRetrieve["Author"] = objArr[0]["author_name"][0];
        // objectToRetrieve["First_Publish_Year"] = obj[0]["first_publish_year"];

        // let subjectArr = objArr[1]["subject"];
        // objectToRetrieve["Subject"] = subjectArr.slice(0, 5);
        console.log(arrayToRetrieve);
      }
      //   if (`${key}` === "docs") {
      //     let docsObject = `${value}`;
      //     let parsedObject = JSON.parse(docsObject);
      //     console.log(parsedObject);
      //   }
    }
  }

  showResponse(responseContainer);
}
searchBook("chemistry");
