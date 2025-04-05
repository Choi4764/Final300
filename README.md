# Final300

---

## 14조

---

#### 프로젝트 제작 기간 : 2024.11.13(수) ~ 2024.12.23(월)

---
## 목차<br>

[1. 개발 환경](#개발-환경)<br>
[2. 패킷 명세서](#패킷-명세서)<br>
[3. ERD 다이어그램](#erd-다이어그램)<br>
[4. 구현 기능](#구현-기능)<br>
[5. 폴더 구조](#폴더-구조)<br>
[6. 팀 노션](#팀-노션)<br>
[7. 프로젝트 제작 인원](#프로젝트-제작-인원)<br>

---

#### 개발 환경

1. 개발 환경
   - 개발 툴 : VS-Code
   - 협업 : GitHub
1. 프로그램 언어
   - Node.js
   - JavaScript
1. 프레임 워크
   - Express
1. 데이터 베이스
   - MySQL
1. 패키지 관리자
   - npm
  
---

#### 패킷 명세서
![pak1](https://github.com/user-attachments/assets/c9aef3be-f179-4a0b-9e04-664371a0b44d)
![pak2](https://github.com/user-attachments/assets/9048d5f8-0dd2-4f0b-b626-2696c9cd7c20)
![pak3](https://github.com/user-attachments/assets/6836c371-229a-42d7-b08e-56962d5ebcbc)
![pak4](https://github.com/user-attachments/assets/3ca662f1-1358-4cde-a9d2-fbaf0b024338)
![pak5](https://github.com/user-attachments/assets/f968e78b-64b7-491d-b11a-456088e46f20)

---

#### ERD 다이어그램
![](https://teamsparta.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F83c75a39-3aba-4ba4-a792-7aefe4b07895%2F4f0e3d4c-5a1d-47e8-a48d-fee219cbb458%2FCopy_of_mmorpg_project_(2).png?table=block&id=5383d2ac-4c60-444f-b45a-93ae20118d88&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&width=2000&userId=&cache=v2)

---

#### 구현 기능
- 실시간으로 다같이 즐길 수 있는 멀티 플레이어 온라인 RPG게임.
- 5가지 캐릭터를 이용한 다양한 조합과 턴제 전투로 다른 플레이어들과 함께 던전을 클리어하는 게임입니다.<br>
1. 캐릭터 생성<br>서버 주소와 포트를 입력 후 닉네임을 설정하고 확인 버튼을 누르면 캐릭터를 생성할 수 있습니다.
2. 캐릭터 이동<br>마우스 좌클릭을 통해 캐릭터를 이동할 수 있습니다.
3. 감정 표현<br>오른쪽 아래 Happy, Sad, Hi UI를 클릭해 캐릭터의 감정 상태를 표현할 수 있습니다.
4. 채팅<br>좌측 채팅창에 쓰고싶은 말을 적은 후 Enter키를 누르거나 Send버튼을 누르는 것으로 마을의 다른 유저들과 대화할 수 있습니다.
---

#### 폴더 구조

📦Final300-main<br>
 ┣ 📂.vscode<br>
 ┃ ┗ 📜settings.json<br>
 ┣ 📂assets<br>
 ┃ ┗ 📜playerCharacter.json<br>
 ┣ 📂src<br>
 ┃ ┣ 📂classes<br>
 ┃ ┃ ┣ 📂managers<br>
 ┃ ┃ ┃ ┗ 📜latency.manager.js<br>
 ┃ ┃ ┗ 📂models<br>
 ┃ ┃ ┃ ┣ 📜dungeon.class.js<br>
 ┃ ┃ ┃ ┣ 📜game.class.js<br>
 ┃ ┃ ┃ ┣ 📜monster.class.js<br>
 ┃ ┃ ┃ ┣ 📜position.class.js<br>
 ┃ ┃ ┃ ┣ 📜stat.class.js<br>
 ┃ ┃ ┃ ┣ 📜town.class.js<br>
 ┃ ┃ ┃ ┗ 📜user.class.js<br>
 ┃ ┣ 📂config<br>
 ┃ ┃ ┗ 📜config.js<br>
 ┃ ┣ 📂constants<br>
 ┃ ┃ ┣ 📜env.js<br>
 ┃ ┃ ┗ 📜header.js<br>
 ┃ ┣ 📂db<br>
 ┃ ┃ ┣ 📂migration<br>
 ┃ ┃ ┃ ┗ 📜createSchema.js<br>
 ┃ ┃ ┣ 📂model<br>
 ┃ ┃ ┃ ┗ 📜model.js<br>
 ┃ ┃ ┣ 📂sql<br>
 ┃ ┃ ┃ ┗ 📜db.sql<br>
 ┃ ┃ ┣ 📂user<br>
 ┃ ┃ ┃ ┣ 📜user.db.js<br>
 ┃ ┃ ┃ ┗ 📜user.queries.js<br>
 ┃ ┃ ┣ 📜database.js<br>
 ┃ ┃ ┗ 📜formatDate.js<br>
 ┃ ┣ 📂events<br>
 ┃ ┃ ┣ 📜onConnection.js<br>
 ┃ ┃ ┣ 📜onData.js<br>
 ┃ ┃ ┣ 📜onEnd.js<br>
 ┃ ┃ ┗ 📜onError.js<br>
 ┃ ┣ 📂handler<br>
 ┃ ┃ ┣ 📂character<br>
 ┃ ┃ ┃ ┣ 📂commands<br>
 ┃ ┃ ┃ ┃ ┣ 📜command.map.js<br>
 ┃ ┃ ┃ ┃ ┗ 📜help.command.js<br>
 ┃ ┃ ┃ ┣ 📜chat.handler.js<br>
 ┃ ┃ ┃ ┣ 📜ItemEquip.handler.js<br>
 ┃ ┃ ┃ ┗ 📜move.handler.js<br>
 ┃ ┃ ┣ 📂dungeon<br>
 ┃ ┃ ┃ ┗ 📜enterDungeon.handler.js<br>
 ┃ ┃ ┣ 📂game<br>
 ┃ ┃ ┃ ┣ 📜animation.handler.js<br>
 ┃ ┃ ┃ ┣ 📜despawn.handler.js<br>
 ┃ ┃ ┃ ┣ 📜enter.handler.js<br>
 ┃ ┃ ┃ ┣ 📜move.handler.js<br>
 ┃ ┃ ┃ ┗ 📜spawn.handler.js<br>
 ┃ ┃ ┣ 📂shop<br>
 ┃ ┃ ┃ ┗ 📜Shop.handler.js<br>
 ┃ ┃ ┣ 📂user<br>
 ┃ ┃ ┃ ┣ 📜login.handler.js<br>
 ┃ ┃ ┃ ┗ 📜register.handler.js<br>
 ┃ ┃ ┗ 📜index.js<br>
 ┃ ┣ 📂init<br>
 ┃ ┃ ┣ 📜index.js<br>
 ┃ ┃ ┣ 📜loadAssets.js<br>
 ┃ ┃ ┗ 📜loadProtos.js<br>
 ┃ ┣ 📂protobuf<br>
 ┃ ┃ ┣ 📜game.proto<br>
 ┃ ┃ ┗ 📜packetNames.js<br>
 ┃ ┣ 📂sessions<br>
 ┃ ┃ ┣ 📜dungeon.session.js<br>
 ┃ ┃ ┣ 📜game.session.js<br>
 ┃ ┃ ┣ 📜sessions.js<br>
 ┃ ┃ ┣ 📜town.session.js<br>
 ┃ ┃ ┗ 📜user.session.js<br>
 ┃ ┣ 📂utils<br>
 ┃ ┃ ┣ 📂db<br>
 ┃ ┃ ┃ ┗ 📜testConnection.js<br>
 ┃ ┃ ┣ 📂error<br>
 ┃ ┃ ┃ ┣ 📜customError.js<br>
 ┃ ┃ ┃ ┣ 📜errorCodes.js<br>
 ┃ ┃ ┃ ┗ 📜errorHandler.js<br>
 ┃ ┃ ┣ 📂packet<br>
 ┃ ┃ ┃ ┗ 📜playerPacket.js<br>
 ┃ ┃ ┣ 📂parser<br>
 ┃ ┃ ┃ ┗ 📜packetParser.js<br>
 ┃ ┃ ┣ 📂response<br>
 ┃ ┃ ┃ ┗ 📜createResponse.js<br>
 ┃ ┃ ┗ 📜transformCase.js<br>
 ┃ ┗ 📜server.js<br>
 ┣ 📜.gitignore<br>
 ┣ 📜.prettierrc<br>
 ┣ 📜package-lock.json<br>
 ┣ 📜package.json<br>
 ┗ 📜README.md<br>
 
---

#### 팀 노션

## [식사하고 합시다](https://teamsparta.notion.site/8256adc6156c4c51aa0cc151949cf16c)

---

#### 프로젝트 제작 인원

- [최승호](https://github.com/Choi4764) [정지웅](https://github.com/node6jjw)
  [윤성원](https://github.com/yso7748) [김선우](https://github.com/Rien3844)
