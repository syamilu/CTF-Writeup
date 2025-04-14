# 🧊 ICECTF Writeup - Web Challenges

Welcome to the official writeup for the **Web Exploitation** category of **ICECTF: Chapter 1**! This repository documents the solutions and techniques used to solve all web-based challenges during the event.

## 🚩 Challenges Overview

| Challenge Name     | Description                      | Vulnerability             | Difficulty |
|--------------------|----------------------------------|----------------------------|------------|
| [Cyber Meme](#cyber-meme)        | Meme-filled site with hidden flag | S3 Misconfiguration        | Easy       |
| Misdirection       | Confusing redirects               | Redirect (P/S: Guessy)  | Easy     |
| PDFBack            | PDF generation via user input     | SSTI (Server-Side Template Injection) | Easy     |
| SEO Scanner Pro    | Internal site scanner             | SSRF (Server-Side Request Forgery)    | Medium       |
| Many Assignment    | Laravel admin access              | Mass Assignment (Laravel)  | Medium     |

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
> Reconnaissance experience where you might feel boring or "leceh" but in real pentesting or bug bounty work, it is where the gold often lies. Recon is the stage where you gather information, understand the system and look for anything that stands out. In this case, sometimes sensitive informations are leaked when some cloud misconfigurations happen. It was a small "meme.txt" detail that led to discovering a big flag hehe.
> **Good recon = good results**. The best hackers are the most observant.
