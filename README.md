# 5 Dollar Nuxt 3 + Pocketbase Setup

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.
Look at the [Pocketbase documentation](https://pocketbase.io/docs/) to learn more.

## Nuxt 3

### Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

### Development Server

Start the development server on `http://localhost:5000`

```bash
npm run dev
```

### Production

Build the application for production:

```bash
npm run build
```

Start the server on `http://localhost:3000`

```bash
npm run start
```

## Server Setup

Don't bother installing Pocketbase locally (although you totally can), it is just too easy deploying and building the db in the Cloud.

### Prepare Server

I want to host Nuxt 3 and Pocketbase on the same Server. So i spun up a 6 Dollar Digital Ocean Droplet running Ubuntu (feel free to use any other Provider, i.e. Linode, AWS, etc.) and installed the following packages:

```bash
# unzip - for the pocketbase install
sudo apt update
sudo apt install unzip

# node - through nvm (i hate being stuck on the wrong node version)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# nginx - to handle routing
sudo apt update
sudo apt install nginx

# git - to get our code from the repository
sudo apt update
sudo apt install git
```

### Folder Structure

#### Nuxt 3 in /var/www/http

Our codebase lives here. Git clone your repo here and build the project.

```bash
git clone "git@hikaru90..." .
npm i
npm run build
npm run start
```

For later: Get the newest version with:

```bash
git pull
npm run build
npm run start
```

*So our Nuxt app now runs at localhost:3000*

If something is out of sync, revert to a specific commit:

```bash
git reset hard id_of_last_working_commit
```

Or reset the branch to the last commit:

```bash
git reset --hard
```


#### Pocketbase in /root/pb

Copy the latest Pocketbase executable through WinSCP or a comparable program, then:

```bash
unzip pocketbase_filename
./pocketbase serve --http="backend.domain.com:8090" --https="backend.domain.com:8443"
```

*Our Pocketbase backend now runs on backend.domain.com:8443*

You could just `./pocketbase serve` to see if everything is working, but we want to use http and https in production later, so we might as well set it up correctly.

#### Nginx in /etc/nginx/sites-available

- I have an ssl-certificate `.crt` from my domain registrar, which I stored together with my private key `.pem` in `/etc/nginx/ssl`
- I also downloaded the intermediate certificate from my registrar and pasted its content into my ssl-certificate file. Both certificates should now be in the right order.
- I use a subdomain for my backend.

I added my domain to my `etc/hosts` file.

```bash
127.0.0.1 domain.com
```

The default Nginx-config I am using looks like this

```bash
server {
    listen 80;
    server_name domain.com;

    location = /robots.txt {
        alias /var/www/http/public/robots.txt;
    }
    location = /favicon.ico {
        alias /var/www/http/public/favicon.ico;
    }

    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name domain.com;
    
    ssl_certificate /etc/nginx/ssl/name_of_crt_file.crt;
    ssl_certificate_key /etc/nginx/ssl/name_of_pem_file.pem; (remember to include intermediate certificates in the file)
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location = /favicon.ico {
        alias /var/www/http/public/favicon.ico;
        access_log off;
        log_not_found off;
    }
}

server {
    listen 80;
    server_name backend.domain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name backend.domain.com;
    client_max_body_size 10M;

    ssl_certificate /etc/nginx/ssl/name_of_crt_file.crt;
    ssl_certificate_key /etc/nginx/ssl/name_of_pem_file.pem; (remember to include intermediate certificates in the file)
    
    location / {
        proxy_set_header Connection '';
        proxy_http_version 1.1;
        proxy_read_timeout 360s;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_ssl_server_name on;

        # enable if you are serving under a subpath location
        # rewrite /yourSubpath/(.*) /$1  break;

        proxy_pass http://127.0.0.1:8090;
    }
}
```

You can now restart nginx 
```bash
sudo service nginx restart
```

## Congratulations

You should see your app on `http://domain.com` and `https://domain.com`  
Your backend sould be reachable at `https://backend.domain.com/_`

## Use systemd - Nobody wants to remember the above

Create two files in `/usr/lib/systemd/system` to register the following services:

pocketbase.service
```bash
[Unit]
Description = pocketbase

[Service]
Type           = simple
User           = root
Group          = root
LimitNOFILE    = 4096
Restart        = always
RestartSec     = 5s
StandardOutput = append:/root/pb/errors.log
StandardError  = append:/root/pb/errors.log
ExecStart      = /root/pb/pocketbase serve --http="backend.domain.com:8090" --https="backend.domain.com:8443"

[Install]
WantedBy = multi-user.target
```
nuxtapp.service
```bash
[Unit]
Description=Nuxt App
After=network.target

[Service]
User=root
WorkingDirectory=/var/www/http
ExecStart=/root/.nvm/versions/node/v16.20.0/bin/node .output/server/index.mjs
Restart=always
Environment=NODE_ENV=production
StandardOutput = append:/var/www/http/errors.log
StandardError  = append:/var/www/http/errors.log

[Install]
WantedBy=multi-user.target
```
### Enable the services

```bash
sudo systemctl enable pocketbase.service
sudo systemctl enable nuxtapp.service
```

Those should now run on server start and restart if it restarts.

## Deployment with systemd

- Push your commits
- SSH into the droplet
- go to `var/www/http/`
- `git pull`
- `sudo systemctl stop nuxtapp.service`
- `npm run build`
- `sudo systemctl start nuxtapp.service`