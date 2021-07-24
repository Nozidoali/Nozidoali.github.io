# My Linux Configurations

In this year, I tried to deploy my linux OS on ubuntu 20.04 LTS. Below is the procedure, commands and scripts.

!!! note "Advantage of Ubuntu 20.04 LTS"
    Comparing to 18.04 LTS:


## Step -1: Lenovo Settings

### About the driver issue (Important! should be fixed before reboot)
Append the following to the file: `/etc/modprobe.d/blacklist.conf`
```
# disable nouveau by Nozidoali
blacklist vga16fb
blacklist nouveau
blacklist rivafb
blacklist rivatv
blacklist nvidiafb
blacklist ideapad_laptop
```

### About the screen brightness configurations
[Reference](https://github.com/wu58430/R7000-brightness-control)

### Install Graphics Drivers:
![drivers](https://blog.csdn.net/qq_23996069/article/details/112862244)
Some hardward will raise problem while 
```
sudo add-apt-repository ppa:graphics-drivers/ppa
sudo apt-get update
sudo ubuntu-drivers devices
```
Then we select the recommanded GPU driver version
```
sudo apt-get install nvidia-driver-460 nvidia-settings nvidia-prime
```

## Step 0: Install `ssh` and `sshd`:
By default, you should have `ssh` already in the environment. To install `sshd`, the server, run:
```
sudo apt-get install openssh-server
```

Then start the server:
```
service sshd start
```

Then we modify the file in `/etc/ssh/sshd_config`, and change the following settings:
```
PubkeyAuthentication yes
PasswordAuthentication no
```

Next, put the public key of your PC to the `~/.ssh/authorized_keys` so that we can log in without password. Then we run `ssh` and login remotely.

### `frp`
Server:
```
nohup ./frps -c frps.ini
```

Client:
```
nohup ./frpc -c frpc.ini
```

## Step 1: Install `zsh` and `oh-my-zsh`:
First we install the dependencies, including `zsh`.
```
sudo apt-get install curl wget git zsh
```

Then we install `oh-my-zsh` from github:
```
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

And then change the theme of oh my zsh
```
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

And in `~/.zshrc`, set `powerlevel10k/powerlevel10k`.

### `zsh` plugins

#### auto suggestions
```
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

Add the plugins `zsh-autosuggestions` in `~/.zshrc`

## Step 2: Proxy Auto Config
```
sudo apt-get install python3-pip
sudo apt-get install shadowsocks-libev
```

Then edit the file `/etc/shadowsocks-libev/config.json` then:
```
sudo systemctl start  shadowsocks-libev-local@config.service
sudo systemctl enable shadowsocks-libev-local@config.service
```

to check the status:
```
netstat -tlnp
```

### proxy
```
export https_proxy="socks5://127.0.0.1:1080"
```


### Install privoxy
```
sudo apt-get install privoxy
```
Modify the file `/etc/privoxy/config`, 
```
# listen-address  localhost:8118
forward-socks5t   /   127.0.0.1:1080 .
listen-address  127.0.0.1:8118
```

### Nginx PAC file generation
```
sudo apt install nginx
sudo pip install genpac
sudo genpac --pac-proxy "SOCKS5 127.0.0.1:1080" --gfwlist-proxy="SOCKS5 127.0.0.1:1080" --gfwlist-url=https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt --output="/var/www/html/autoproxy.pac"
```

## Step 3: Beautify Ubuntu

### install docky
```
mkdir -p ~/Downloads/docky
cd ~/Downloads/docky

wget http://archive.ubuntu.com/ubuntu/pool/universe/g/gnome-sharp2/libgconf2.0-cil_2.24.2-4_all.deb
wget http://archive.ubuntu.com/ubuntu/pool/main/g/glibc/multiarch-support_2.27-3ubuntu1_amd64.deb
wget http://archive.ubuntu.com/ubuntu/pool/universe/libg/libgnome-keyring/libgnome-keyring-common_3.12.0-1build1_all.deb
wget http://archive.ubuntu.com/ubuntu/pool/universe/libg/libgnome-keyring/libgnome-keyring0_3.12.0-1build1_amd64.deb
wget http://archive.ubuntu.com/ubuntu/pool/universe/g/gnome-keyring-sharp/libgnome-keyring1.0-cil_1.0.0-5_amd64.deb

sudo apt-get install ./*.deb

wget http://archive.ubuntu.com/ubuntu/pool/universe/d/docky/docky_2.2.1.1-1_all.deb
sudo apt-get install ./docky_2.2.1.1-1_all.deb
```

### set GNOME global settings
```
gsettings set org.gnome.system.proxy mode auto
gsettings set org.gnome.system.proxy autoconfig-url 'http://localhost/autoproxy.pac'
```

To disable 
```
gsettings set org.gnome.system.proxy mode none
```

### Install gnode extensions
```
sudo apt install gnome-tweaks chrome-gnome-shell
sudo apt install gnome-shell-extensions
```
[User Themes](https://extensions.gnome.org/extension/19/user-themes/)
[Alt+Tab](https://extensions.gnome.org/extension/97/coverflow-alt-tab/)
[System Monitor](https://extensions.gnome.org/extension/120/system-monitor/)

```
sudo add-apt-repository ppa:ricotz/docky
sudo pat-get update
sudo apt-get install docky
```

### Install network related packages
```
sudo apt-get install net-tools
```

### install typora
```
# or use
# sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys BA300B7755AFCFAE
wget -qO - https://typora.io/linux/public-key.asc | sudo apt-key add -

# add Typora's repository
sudo add-apt-repository 'deb https://typora.io/linux ./'
sudo apt-get update

# install typora
sudo apt-get install typora
```

## Step 4: Softwares

### Install vscode on linux
```
sudo apt install software-properties-common apt-transport-https wget
wget -q https://packages.microsoft.com/keys/microsoft.asc -O- | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main"
sudo apt install code
```

### Install chrome
From the website [https://www.google.cn/intl/en_uk/chrome/](https://www.google.cn/intl/en_uk/chrome/)

### Install mkdocs
```
pip install mkdocs
pip install mkdocs-mermaid2-plugin

```
