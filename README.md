
---

## 🚀 Project Setup  

This repository contains a project that requires **Node.js 16** to run. Follow the steps below to set up and start the project.  

### 📥 Installation  

1. **Install Node.js 16** (Debian/Ubuntu-based systems):  
   ```sh
   curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt install -y nodejs
   ```  

2. **Verify installation:**  
   ```sh
   node -v
   npm -v
   ```  

3. **Install dependencies:**  
   ```sh
   npm install
   ```  

### 🚀 Run the Project  

To start the development server, run:  
```sh
npm run dev
```  

---

**note:**
If it not wokring, use 18 version of node and npm






### Optimized Commands

```bash
# 1. Update and upgrade the system
sudo apt update && sudo apt upgrade -y

# 2. Install Apache2 and start it (no need for 'clear' commands in between)
sudo apt install apache2 -y
sudo systemctl start apache2
sudo systemctl enable apache2

# 3. Install Node.js (version 16)
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs
node -v
npm -v

# 4. Clone the WellnessFusion repository
git clone https://github.com/ssupshub/WellnessFusion.git
cd WellnessFusion/

# 5. Install dependencies and start the development environment
npm install
npm run dev

# 6. Install NVM and Node.js version 18
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18
node -v

# 7. Install PM2 and run the server
npm install -g pm2
pm2 start tsx -- server/index.ts --name rest-express

# 8. Install and configure Nginx
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl stop apache2
sudo systemctl enable nginx

# 9. Configure Nginx
sudo nano /etc/nginx/sites-available/rest-express
sudo ln -s /etc/nginx/sites-available/rest-express /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# 10. Manage PM2 and Nginx for changes
pm2 reload tsx
systemctl reload nginx
```


