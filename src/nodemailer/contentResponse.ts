const contentEmailResponse = (email: string, name: string, password: string, token: string): string => {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <div style="display: block; text-align:center;">
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThvIT0v4yBWsTbCcghDrEnqZYpYTi_TgcwMA&usqp=CAU"
              alt=""
            />
            <hr />
          </div>
          <div>
    
              Hello, <b>${name}</b>! Thank you for your registration! <br/> Please, press
              the button below if you want to confirm your email address.
    
          </div>
          <div style="margin:20px 0;">
            <a
              href="http://localhost:8080/v1/api/auth/${token}"
              style="
                text-decoration: none;
                color: blue;
                background-color: orange;
                padding:10px 20px;
                border-radius: 10px;
    
              "
              >CONFIRM EMAIL</a
            >
          </div>
          <div>
              To log in, you can use the credentials we have provided below.
          </div>
          <div>
            <div><b>Your login: </b><span>${email}</span></div>
            <div><b>Your password: </b><span>${password}</span></div>
          </div>
        </div>
      </body>
    </html>`
}

export default contentEmailResponse
