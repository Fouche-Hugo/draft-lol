import json
import requests
import os
import tarfile
import shutil

def get_latest_ddragon_version():
    url = "https://ddragon.leagueoflegends.com/api/versions.json"
    response = requests.get(url)
    if response.status_code == 200:
        versions = response.json()
        latest_version = versions[0]  # Assuming the latest version is the first in the list
        return latest_version
    else:
        print("Failed to fetch Data Dragon versions.")
        return None

def download_ddragon_tar(version):
    tar_filename = f"dragontail-{version}.tgz"
    if os.path.exists(tar_filename):
        print(f"{tar_filename} already exists.")
        return True

    tar_url = f"https://ddragon.leagueoflegends.com/cdn/dragontail-{version}.tgz"
    response = requests.get(tar_url)
    if response.status_code == 200:
        with open(tar_filename, "wb") as f:
            f.write(response.content)
        print(f"Downloaded {tar_filename}")
        return True
    else:
        print("Failed to download Data Dragon tar file.")
        return False

def extract_and_move_files(version):
    tar_file = f"dragontail-{version}.tgz"
    with tarfile.open(tar_file, "r:gz") as tar:
        tar.extractall(f"dragontail/")
        print(f"Extracted files from {tar_file}")

    current_directory = os.path.dirname(os.path.abspath(__file__))
    
    src_folder = f"dragontail/{version}/img/champion"
    dest_folder = os.path.join(current_directory, "public/champions")
    if not os.path.exists(dest_folder):
        os.makedirs(dest_folder)
    for file in os.listdir(src_folder):
        src_path = os.path.join(src_folder, file)
        dest_path = os.path.join(dest_folder, file)
        shutil.move(src_path, dest_path)
    
    # src_path = f"dragontail/{version}/data/en_US/championFull.json"
    # dest_folder = os.path.join(current_directory, "lol_picksandbans/web/assets/cdragon/14.7.1/data/en_US")
    # dest_path = os.path.join(dest_folder, "championFull.json")
    # if not os.path.exists(dest_folder):
    #     os.makedirs(dest_folder)
    # shutil.move(src_path, dest_path)
    # print(f"Moved files to lol_picksandbans/web/assets/cdragon")

def update_champions_json(version):
    current_directory = os.path.dirname(os.path.abspath(__file__))

    src_path = f"dragontail/{version}/data/en_US/championFull.json"
    
    # get the json values
    with open(src_path, "r", encoding="utf8") as f:
        data = json.load(f)
        champions = data["data"]

        # save the champion name and the image name
        champions_json = []
        for champion in champions.values():
            champions_json.append({"name": champion["name"], "image": champion["image"]["full"]})

        # Sort champions by name
        champions_json.sort(key=lambda champion: champion["name"])

        dest_folder = os.path.join(current_directory, "src/data/champions.json")
        with open(dest_folder, "w") as f:
            json.dump(champions_json, f)
        print(f"Updated champions_test file to src/data/champions file")

def main():
    latest_version = get_latest_ddragon_version()
    if latest_version:
        print(f"Latest Data Dragon version: {latest_version}")
        if download_ddragon_tar(latest_version):
            extract_and_move_files(latest_version)
            update_champions_json(latest_version)
    else:
        print("Failed to retrieve latest Data Dragon version.")

if __name__ == "__main__":
    main()
