# My Linux Configurations

In this year, I tried to deploy my linux OS on ubuntu 20.04 LTS. Below is the procedure, commands and scripts.

!!! note "Advantage of Ubuntu 20.04 LTS"
    Comparing to 18.04 LTS:

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

### Nginx PAC file generation
```
sudo apt install nginx
sudo pip install genpac
sudo genpac --pac-proxy "SOCKS5 127.0.0.1:1080" --gfwlist-proxy="SOCKS5 127.0.0.1:1080" --gfwlist-url=https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt --output="/var/www/html/autoproxy.pac"
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
