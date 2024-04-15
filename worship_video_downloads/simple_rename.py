import os
import opencc
from PIL import Image
# 定义要处理的文件夹路径
folder_path = 'C:\\UGit\\worship_videos\\worship_video_downloads\\video'

# 创建 OpenCC 实例，用于繁简体转换
converter = opencc.OpenCC('tw2s')

def convert_filenames(folder_path):
    # 遍历文件夹下的所有子文件夹和子文件
    for root, dirs, files in os.walk(folder_path):
        # 遍历子文件夹
        for dir_name in dirs:
            # 获取子文件夹的路径
            dir_path = os.path.join(root, dir_name)
            # 将子文件夹名从繁体转换为简体
            new_dir_name = converter.convert(dir_name)
            # 构建新的子文件夹路径
            new_dir_path = os.path.join(root, new_dir_name)
            # 重命名子文件夹
            os.rename(dir_path, new_dir_path)
            convert_filenames(new_dir_path)

        # 遍历子文件
        for file_name in files:
            # 获取文件的路径
            file_path = os.path.join(root, file_name)
            # 将文件名从繁体转换为简体
            new_file_name = converter.convert(file_name)
            # 构建新的文件路径
            new_file_path = os.path.join(root, new_file_name)
            # 重命名文件
            os.rename(file_path, new_file_path)

# 调用函数，传入要遍历的文件夹路径
convert_filenames(folder_path)