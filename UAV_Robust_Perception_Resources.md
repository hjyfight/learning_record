### 1.对抗

- **Robust Vision Transformer (CVPR 2022)** ==可用==
  - 代码: https://github.com/vtddggg/Robust-Vision-Transformer
  - 论文链接:[[2105.07926\] Towards Robust Vision Transformer](https://arxiv.org/abs/2105.07926#:~:text=By using and combining robust components as building,transformer and has superior performance with strong robustness.)
  - 特点：提升Vision Transformer在对抗攻击下的鲁棒性

- **UAV图像识别鲁棒性增强**
  - 论文: [Adversarial Robustness Enhancement of UAV-Oriented Automatic Image Recognition](https://www.mdpi.com/2072-4292/15/12/3007) ==可用==
  - 代码:[ZeoLuuuuuu/AREP-RSIs: An one-stop platform for conducting adversarial defenses and conveniently evaluating adversarial robustness of DNN-based visual recognition system](https://github.com/ZeoLuuuuuu/AREP-RSIs)
  - 特点: 基于CNN和Transformer的集成方法
  - 应用: 主动防御（生成鲁棒模型）和被动防御（对抗检测）
- **Patch-Agnostic Defense against Adversarial Patch Attacks** ==可用==
  - 论文链接:[PAD: Patch-Agnostic Defense against Adversarial Patch Attacks](https://arxiv.org/html/2404.16452)
  - 代码链接:https://github.com/Lihua-Jing/PAD
  - 特点:解决对抗性补丁攻击(adversarial patch attacks)对真实世界目标检测器的威胁~
- 城市低空复杂背景下无人机环境感知方法研究 ==不可用 没有代码==
  - 论文链接:[《城市低空复杂背景下无人机环境感知方法研究 | 第四届人工智能与计算机工程国际会议论文集》 --- Research on Unmanned Aircraft Environment Perception Methods in Urban Low Altitude Complex Backgrounds | Proceedings of the 4th International Conference on Artificial Intelligence and Computer Engineering](https://dl.acm.org/doi/abs/10.1145/3652628.3652817)
  - 目前没有代码链接，但是和主题及其相关

### 2. **多模态融合感知**
- **Princeton Seeing Through Fog**  ==可用==
  - 代码: https://github.com/princeton-computational-imaging/SeeingThroughFog
  - 论文链接:https://ieeexplore.ieee.org/document/9157107
  - 特点：深度多模态传感器融合，应对恶劣天气条件（雾、雨、雪）

- **HazyDet: Drone‑view Object Detection in Hazy Scenes** ==可用==

  - 内容：针对无人机视角下雾霾（深度感知 + 目标检测）问题提出 HazyDet 数据集与多尺度深度感知网络。

  - 代码链接：https://github.com/GrokCV/HazyDet

  - 论文链接：https://arxiv.org/html/2409.19833

### 3. **SLAM与导航系统**       ==避险相关==
- **UAV Visual SLAM Navigation**
  - 代码: https://github.com/IeiuniumLux/Visual-SLAM
  - 特点：基于视觉的SLAM自主导航，包含障碍物检测和避障

### 4. **深度强化学习避障项目**
- **[UAV_Obstacle_Avoiding_DRL](https://github.com/ZYunfeii/UAV_Obstacle_Avoiding_DRL)**
  - 代码: [ZYunfeii/UAV_Obstacle_Avoiding_DRL: 这是一个关于无人机深度强化学习自主避障算法的项目。 --- ZYunfeii/UAV_Obstacle_Avoiding_DRL: This is a project about deep reinforcement learning autonomous obstacle avoidance algorithm for UAV.](https://github.com/ZYunfeii/UAV_Obstacle_Avoiding_DRL)
  - 论文链接:https://link.springer.com/chapter/10.1007/978-981-16-9492-9_139
  - 特点：深度强化学习自主避障算法
- **[UAV_obstacle_avoidance_controller](https://github.com/abhiksingla/UAV_obstacle_avoidance_controller)**
  - 代码链接: [abhiksingla/UAV_obstacle_avoidance_controller: 使用深度循环强化学习与时间注意力机制的 UAV 避障 --- abhiksingla/UAV_obstacle_avoidance_controller: UAV Obstacle Avoidance using Deep Recurrent Reinforcement Learning with Temporal Attention](https://github.com/abhiksingla/UAV_obstacle_avoidance_controller)
  - 特点：使用深度循环强化学习与时间注意力机制的无人机避障
