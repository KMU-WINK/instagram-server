# 인스타그램 리디자인

![Express.JS](https://img.shields.io/badge/express.js-JavaScript-007ACC?style=for-the-badge&logo=express&logoColor=white)

---

## Usage

### [IMPORTANT]

VSCode 확장 기능 중에서 **Prettier**와 **Eslint**를 설치해야 합니다.

### 의존성 설치
```
yarn install
```

### sequelize setting
```
npx sequelize db:create
-> create database

npx sequelize model:generate --name "tableName" --attributes title:string 
-> create model & migration file

npx sequelize migration:generate --name fk-category
-> create foreign key config file

npx sequelize db:migrate
-> model and migration file apply to db

npx sequelize db:seed:all
-> insert all dummy 

npx sequelize db:seed --seed filename
-> insert specify dumy


```
**특정 파일을 마이그레이션 하는 커맨드는 아직 찾지 못했습니다 ㅠㅠ 만약 찾으시는 분 있으면 readme 수정 부탁드려요**


### 개발서버 실행
```
npx nodemon app.js
```



## Libraries
<table>
<tbody>
    <tr>
        <td width="60">
            <div align="center"><a href="https://expressjs.com/" target="_blank"> <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcIhGA5%2FbtqzGqkkgzS%2Fzlfks0i9g5cBFwnfLyDr70%2Fimg.png" alt="Express.js" width="40" height="40"/> </a><br>Express.js</br></div>
        </td>
        <td width="60">
            <div align="center"><a href="https://sequelize.org/" target="_blank"> <img src="https://ichi.pro/assets/images/max/724/1*Nt9mcMw6paQBnSH-i1zAKQ.png" alt="Sequelize" width="40" height="40"/> </a><br>Sequelize</br></div>
        </td>
        <td width="60">
            <div align="center"><a href="https://nodejs.org" target="_blank"> <img src="https://nodejs.org/static/images/logo.svg" alt="nodejs" width="40" height="40"/> </a><br>Node.js</br></div>
        </td>
          <td>
            <div align="center"><a href="https://babeljs.io/" target="_blank"> <img src="https://webpack.js.org/site-logo.1fcab817090e78435061.svg" alt="babel" width="40" height="40"/> 
            </a><br>Babel</br></div>
        </td>
        <td>
            <div align="center"><a href="https://webpack.js.org" target="_blank"> <img src="https://devicons.github.io/devicon/devicon.git/icons/webpack/webpack-original.svg" alt="webpack" width="40" height="40"/> </a><br>Webpack</br></div>
        </td>
        <td width="60">
            <div align="center"><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png" alt="javascript" width="40" height="40"/> </a><br>Javascript</br></div>
        </td>
    </tr>
</tbody>
</table>