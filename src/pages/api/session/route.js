import Cookies from "cookies"

export default async function get(req, res) {

    //Initialise cookies
    const cookies = new Cookies(req, res);

    const myCookie = cookies.get('hasVisited')

    //Check if there is a cookie
    // if(myCookie !== undefined){
    //     console.log('cookie exists')
    //     res.status(200).send(`The value of myCookie is ${myCookie}`);
    // }else {
    //     // The cookie doesn't exist
    //     cookies.set('hasVisited', true)
    //     res.status(200).send('hasVisited does not exist, but is now added');
    //   }
    
    cookies.set('hasVisited', null, {
        // Set the cookie to expire in the past
        expires: new Date(0),
        httpOnly: true, // Set the cookie to be accessible only via HTTP(S) requests, not JavaScript
        secure: process.env.NODE_ENV === 'production', // Set the cookie to be accessible only via HTTPS in production
      });
      res.status(200).send('Cookie removed!');

    // console.log('hasVisited', request.cookies.has('hasVisited'))
    //If cookie send response that will route to the capture screen- send the GUID along, store in local storage on the front end
   
    //If no cookie, set a cookie to stay hasVisitedRecently

    //Respond with the cookie and also the GUID to store in local storage
};



