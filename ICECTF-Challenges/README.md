# 🧊 ICECTF Writeup - Web Challenges

Welcome to the official writeup for the **Web Exploitation** category of **ICECTF: Chapter 1**! This repository documents the solutions and techniques used to solve all web-based challenges during the event.

## 🚩 Challenges Overview

| Challenge Name     | Description                      | Vulnerability             | Difficulty |
|--------------------|----------------------------------|----------------------------|------------|
| [Cyber Meme](#cyber-meme)        | Meme-filled site with hidden flag | S3 Misconfiguration        | Easy       |
| Misdirection       | Confusing redirects               | Redirect (P/S: Guessy)  | Easy     |
| [PDFBack](#pdfback)            | PDF generation via user input     | SSTI (Server-Side Template Injection) | Easy     |
| [SEO Scanner Pro](#seo-scanner)    | Internal site scanner             | SSRF (Server-Side Request Forgery)    | Medium       |
| [Many Assignment](#many-assignment)    | Laravel admin access              | Mass Assignment (Laravel)  | Medium     |

> [!NOTE]
> 💡 Each writeup includes: challenge description, solution steps, exploit PoC, and flag.

## 👥 Credits

Organized by [**SIG Cybersecurity IIUM**](https://www.linkedin.com/company/sigcyberseciium) in collaboration with [**ICE**](https://www.linkedin.com/company/ice-cybersecurity-enthusiast)  
Sponsored by [**RE:HACK**](https://www.linkedin.com/company/rehack-xyz), [**ASK Pentest**](https://www.linkedin.com/company/ask-pentest/), [**Azmi Production**](https://www.linkedin.com/company/azmi-productions/), [**Forthify**](https://www.linkedin.com/company/forthify-technologies/) and [**DeTA**](https://www.linkedin.com/company/developertanahair)

Web Challenges by [@syamilu](https://github.com/syamilu)  
Shoutout to all ICECTF players & the community!

# Cyber Meme<a name="cyber-meme"></a>
1. In this challenge you will get a website that full of cybersecurity related meme.

![image](https://github.com/user-attachments/assets/f5679bba-c534-4c73-b6d3-4120a140a4a7)

2. Looking at the image and source code, you cannot see anything suspicious except some line of code for toggle the theme. Upon closer look, you can see that the all the meme image have the same source which is ```https://meme-icectf-bucket.s3.ap-southeast-1.amazonaws.com/icectf-meme/<meme-name>```

![image](https://github.com/user-attachments/assets/8bbfec30-ccbe-4ba7-9e50-2249835b5d5b)

3. By doing some research or chatgpt, we know that it is an S3 bucket link.

> [!NOTE]
> An S3 bucket is a storage container in Amazon S3 (Simple Storage Service) where you can store files (called objects) like images, videos, documents, backups, etc.

4. Some common vulnerabilities or misconfigurations that associated with this public S3 bucket structure is when the **S3 bucket is misconfigured to allow public listing**. Anyone in the internet can list all files anywhere and anytime. To test it, we can try visiting the bucket root URL as it might show a list of all the files. The bucket root URL is ```https://meme-icectf-bucket.s3.ap-southeast-1.amazonaws.com/```. 

![image](https://github.com/user-attachments/assets/b6fe0280-7367-4e6e-b76f-18d8f5224751)

5. We can see the list of all files in the bucket. Now we know that the user misconfigured to allow list all the files. What we need to do is to view all the files to see whether theres any files that maybe **sensitive** or different from our cyber meme web.

![image](https://github.com/user-attachments/assets/2b492202-3ec7-45c0-9cc8-4bad3a55700e)

6. We see that theres one files that are different from other as it is **.txt** files while others is **.png** files. Then we can try to access the files to see whether there is anything that pique our interest(password, api key, or flag in this case). 

![image](https://github.com/user-attachments/assets/f1e66849-252d-4874-b571-405e29240ca9)

7. Boom, theres our flag at the bottom of the file!
```Flag : ICECTF{g3t_0ut_0f_my_buck3t_a6b7ssj}```
> [!TIP]
> Reconnaissance might feel boring or "leceh" but in real pentesting or bug bounty work, it is where the gold often lies. Recon is the stage where we gather information, understand the system and look for anything that stands out. In this case, sometimes sensitive informations are leaked when some cloud misconfigurations happen. It was a small "meme.txt" detail that led to discovering a big flag hehe.
> **Good recon = good results**. The best hackers are the most observant.

# PDFBack<a name="pdfback"></a>
Description :
📄 PDFBack is a sleek feedback system built for a startup that loves hearing from users. Every piece of feedback submitted gets automatically turned into a downloadable PDF for "archival purposes."
You don’t need to log in. Just write your thoughts, hit submit, and you'll get a pretty little PDF with your message.

Hint 1 : Wait how do they print the pdf? Using template probably?

1. In this challenge, we were given a website that we can submit a feedback and download the pdf. There are actually two ways to solve this challenge, but im gonna go with intended way which is Server Side Template Injection. Let start with the payload. To know whether the input is vulnerable with SSTI, we can use some payload from [Payload All Things](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Server%20Side%20Template%20Injection/README.md)
2. The infamous one is ```{{7*7}}``` payload where if the server return ```49``` we know that it is vulnerable to Server Side Template Injection. Lets start injecting it in our feedback.

  ![image](https://github.com/user-attachments/assets/56aa35e6-be77-46c6-bd37-ae99a680dcb2)

3. Interestingly it doesnt reflect in our record

   ![image](https://github.com/user-attachments/assets/ec078304-6fba-41a0-a23f-f1c7bae610f2)

4. Yet, in the challenge description they do say something about pretty little pdf with our message. Maybe we can try to download the pdf first?

    ![image](https://github.com/user-attachments/assets/2b84f991-c5e0-4bf1-9556-8d4e2feecb1d)

5. And boom, it does reflect in our downloaded pdf eventhough it doesnt reflect before our download the pdf. Well tricky right? Some participants thought that it doesnt work then they just go back without downloading it. Intended hehe.
6. Now we can just try our payload, we can even ask chatgpt help us generate the payload. Remember the hint also about template isn't it? So heres the payload that i use to list all files.
   ```
   {{ self._TemplateReference__context.cycler.__init__.__globals__.os.popen('ls').read() }}
   ```

   ![image](https://github.com/user-attachments/assets/db3812b0-d85c-451c-b8df-6a81e7a6acdf)

7. Vroom vroom we can list it. Now we can just cat the flag.txt! Lesgoo
   ```
    {{ self._TemplateReference__context.cycler.__init__.__globals__.os.popen('cat flag.txt').read() }}
   ```

    ![image](https://github.com/user-attachments/assets/82a1c33b-9ae6-442a-b6ea-09a88be86035)

8. And booom we got the flag! ```Flag :ICECTF{n0t_s4n1t1z3d_t3mpl4t3s_4r3_d4ng3r0us}```


# SEO Scanner Pro<a name="seo-scanner"></a>
Description :
Our SEO team uses a fancy in-house tool called SEO Scanner Pro™ to analyze websites by fetching their metadata — like title tags, keywords, etc.
It’s clean. It’s shiny. It’s safe... right?

Hint 1 : Our junior devs said we also have in house admin dashboard<br>
Hint 2 : So in house means in the same server right?

1. In this challenge we see a website that have only one button which is scan my website.

  ![image](https://github.com/user-attachments/assets/0eacc368-255a-4b13-bb4e-08f2cc326e71)

2. Lets try to click the button and check the network tab in developer tools
  
  ![image](https://github.com/user-attachments/assets/dd64c9be-3296-4f17-a6a8-0e3cdf33c066)
  
  ![image](https://github.com/user-attachments/assets/9745b42d-10dc-43f2-8429-7df19a58108b)
  
  ![image](https://github.com/user-attachments/assets/7a5b9d76-8ddb-4bdd-b531-cda72cd47ffb)

3. Looking at the request header, request payload and response we can deduce that this website send a request to the url given and the response will return the title of the web and html of it. 
4. Well, as the url for the scanned website in the payload, maybe we can change it to scan any other website? Let's use curl to scan a website that are not valid. Let see the response. This is the curl payload :
  ```curl -k -X POST https://seoscanner.syamilyusof.com/api/scan   -H "Authorization: Bearer seoscannerprotoken"   -H "Content-Type: application/json" -d '{"site": "<<url>>"}'```
  Don't forget to send the **Authorization token** or else you will get error unauthorized.

  ![image](https://github.com/user-attachments/assets/3cbd25ca-d6a5-4713-854f-6768069d875a)

5. We get a response of unable to scan site. Now one thing that we know is that if the site is available, we get some repsonse of title and html of the web and if it is not available we get "unable to scan site" response. Based on the hint given, we know that there is **admin** site somewhere in the same server as our seo scanner website. But we cannot access it. Now, by doing some research, we can expect that this may be a **Server-Side Request Forgery** vulnerability

   > [!NOTE]
   > SSRF is a web vulnerability where the server is tricked into making a request to another server, internal api or internal dashboard on behalf of the attacker.

6. Now the first thing we need to understand is that we may be able to scan the localhost. To do it we need to test by searching for port number that our Seo Scanner Pro web is running on. We can do some scripting to brute force each port, and the port that return some response with title is the port that are currently running. For demonstration purpose, im gonna scan port 3000 to 3005 only.
  
    ```python
    import requests
    import urllib3
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
    
    target_url = "https://seoscanner.syamilyusof.com/api/scan"
    host = "127.0.0.1"  # SSRF target
    
    headers = {
        "Authorization": "Bearer seoscannerprotoken",
        "Content-Type": "application/json",
    }
    
    for port in range(3000, 3005):
        payload = {
            "site": f"http://{host}:{port}"
        }
    
        try:
            response = requests.post(
                target_url,
                headers=headers,
                json=payload,
                timeout=3,
                verify=False
            )
            data = response.json()
    
            if "result" in data and "SEO Scan Complete" in data["result"]:
                print(f"[+] Port {port} OPEN → {payload['site']}")
            elif "error" in data:
                print(f"[!] Port {port} blocked or closed → {data['error']}")
            else:
                print(f"[-] Port {port} unknown response → {data}")
        except requests.exceptions.RequestException as e:
            print(f"[x] Port {port} request error → {e}")
    ```
    ![image](https://github.com/user-attachments/assets/695ad318-c3e9-44fc-bb7a-38e4c624cf02)

7. Wew, we got some response. We can see that port 3003 is open eventhough we are not sure yet what will it response. Now using our curl + localhost port that we found. We try to see the response.

   ![image](https://github.com/user-attachments/assets/ebcc9adf-04c5-45a9-96ed-a9c120d0e1ec)

8. And boom, what we see now is the SEO Scanner website that hosted at port 3003. Now remember our hint? In-house admin site? It means that the admin site is in the same server with our SEO Scanner website but probably in another port. Now by adding our port scanning range, we may able to find something interesting. Lets go!

   ```python
   # change this line in our original code to port 5000
   # for port in range(3000, 3005):
   for port in range(3000, 5000):
   ```

   ![image](https://github.com/user-attachments/assets/88c3b548-cbb6-450a-88f9-968fea5ffc05)

10. Guest what? We found something in port 4889. Let's try to curl it, hopefully it will show some admin dashboard hiuhiu.

  ![image](https://github.com/user-attachments/assets/decb01f8-36e8-445a-b4f1-bbd7c93c4048)

10. And boom! We are in. Admin dashboard that we should be able to access from local only now we are able to see it from our terminal. Let's see anything that we can see anything from the response. Pasting it in some text editor will make it more pretty hehe.

    ![image](https://github.com/user-attachments/assets/9cf30343-eb16-4002-bfec-a2d30571b95a)

11. We see some interesting thing which is :
    ```html
    <li>
        Flag Endpoint: <code>/internal/flag</code>
    </li>
    ```
12. Letsss curlll!!!!!

    ![image](https://github.com/user-attachments/assets/b05211fc-eda3-4870-bae8-ca9e90647ab8)

13. And boom thats the flag! ```Flag: ICECTF{ssrf_scan_ftw_89866b}```

> [!TIP]
> Patience & Persistence is important in hacking. A good hacker isn’t always the smartest — they’re the most patient, the most curious, and the most relentless.


# Many Assignments<a name="many-assignment"></a>
Description :
Welcome to ManyAssignment Inc., the revolutionary startup building portals no one asked for. We've just launched our internal dashboard, and of course, it's secure — because our junior dev said so. Can you sneak your way into the admin area and uncover the secret hidden in plain sight?

1. In this challenge we were given a source code of the website built using Laravel Framework. Laravel is using Model View Controller structure. The simple way to think : Model is for database, View for Frontend and Controller is the API. Well obviously theres deeper meaning for each but im not gonna touch about it. Lets start with looking into our source code.
2. In routes/web.php, we can see the list of routes that are available and we can access from public.

    ![image](https://github.com/user-attachments/assets/14746185-a3f5-4472-b64d-7d0f2eeda63e)

3. Well obviously we see one routes that we interested with which is **/admin/flag**. But if we try to access it, we will return with **403 Unauthorized** which indicate we does'nt have any access to the page. Now lets take a look to the Controller that return the flag page.

    ![image](https://github.com/user-attachments/assets/106073a0-11b8-4cd6-8fff-82d93e0786e5)

4. Based on the code, we know that it will get current user id and check whether the user is admin or not. It will only return the page if the user is admin. Now how do we become an admin? Let's take a look at our registration controller, model and migration file :

    a. /app/Http/Controllers/UserController.php
    
    ![image](https://github.com/user-attachments/assets/ba2a8b7e-60a1-4f34-b577-0baa6c434eb0)
  
    b. /app/Models/User.php
    
    ![image](https://github.com/user-attachments/assets/cb47b9a9-4ac6-46fd-8ec6-ccbe8dadee95)
  
    c. /database/migrations/0001_01_01_000000_create_users_table.php
    
    ![image](https://github.com/user-attachments/assets/0a566072-60e8-4fd6-8414-ecee265624af)


5. Interesting thing that we can see is that in User.php, there is no attributes for the User while there are many attributes in the database table including is_admin. Now in this challenge, there is one vulnerability that we call mass assignment where we doesnt validate user input in the registration controllers (this line in the Controller :```User::create($request->all());```). Now you can intercept registration process using burpsuite and include is_admin attributes in the form.
> [!NOTE]
> Mass Assignment in Laravel happens when users can send unexpected fields in a request, and Laravel blindly saves them to the database using methods like:
> ```php
> Model::create($request->all());
> ```
> If you don’t protect the model, attackers can inject fields like is_admin, role, or status and gain unauthorized access or modify sensitive data.

  ![image](https://github.com/user-attachments/assets/f79f02bf-0bdf-4b3e-9efe-9f997ffb19cf)

7. The highlighted one is the attributes that we add. Now lets try to register and login to see whether we can inject the is_admin attributes in the registration.

     ![image](https://github.com/user-attachments/assets/b1cb908b-6695-4354-ba3b-eb0cadfcf13a)

8. What we can see is that we were redirected to login page. We can assume that our registration is successful. Lets try to login using our registered details.

     ![image](https://github.com/user-attachments/assets/5169e184-b091-4398-af85-6e08cbceae18)

9. And boom, we are logged in as admin. Now lets just access our flag routes which is **/admin/flag**

      ![image](https://github.com/user-attachments/assets/554725f0-789e-4b77-a707-7d53aed4bb56)

10. And voila, theres our flag! Due to some technical, i forgot to change the flag to our ICECTF format. But anyway, a flag is still a flag isn't it? ```Flag : flag{mass_assignment_master}```
