document.ready(function(){
    $ajax({
        url: '/resources/json/resume.json',
        type: 'get',
        async: false,
        data: {},
        success: function(obj) {
            var $_resumeContanier = document.getElementById('resume-contanier');
                $_resumeContanier.innerHTML = 
                        `
                        <div class="resume-header">
                            <div class="resume-header-left">
                                <h4>
                                ${obj.pinyin.map(pinyin => `
                                    <span>${pinyin}</span>
                                `).join('.')}
                                </h4>
                                <h1>${obj.name}<span>-${obj.workType}</span></h1>
                                <h2>${obj.profession}</h2>
                                <h3>${obj.industry}</h3>
                                <h3>${obj.work}</h3>
                            </div>
                            <div class="resume-header-right">
                                <ul>
                                    <li>
                                        <i class="fa fa-home"></i><span>${obj.sex}</span><span>${obj.age}</span><span>${obj.both}</span>
                                    </li>
                                    <li>
                                        <i class="fa fa-phone"></i><span>${obj.phone}</span>
                                    </li>
                                    <li>
                                        <i class="fa fa-envelope"></i><span>${obj.Email}</span>
                                    </li>
                                    <li>
                                        <i class="fa fa-clock-o"></i><span>${obj.workYear}</span>
                                    </li>
                                    <li>
                                        <i class="fa fa-graduation-cap"></i><span>${obj.university}</span><span>${obj.xueli}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="resume-content">
                            <div class="resume-content-item">
                                <h1 class="resume-content-item-title">职业技能</h1>
                                <ol>
                                    ${obj.skills.map(item => `
                                        <li>${item}</li>
                                    `).join('')}
                                </ol>
                            </div>
                            <div class="resume-content-item">
                                <h1 class="resume-content-item-title">自我评价</h1>
                                <ol>
                                    ${obj.evaluation.map(item => `
                                        <li>${item}</li>
                                    `).join('')}
                                </ol>
                            </div>
                            <div class="resume-content-item">
                                <h1 class="resume-content-item-title">工作经历</h1>
                                <ul>
                                    ${obj.workExperience.map(item => `
                                        <li class="first">
                                            <span class="time">${item.time}</span>
                                            <div class="desc"><span>${item.company}</span>|<span>${item.companyType_1}</span>|<span>${item.companyType_2}</span>| <span>${item.companySize}</span>|<span>${item.station}</span></div>
                                            <h5>工作范围:</h5>
                                            <ol>
                                                ${item.workScale.map(workScale => `
                                                    <li>${workScale}</li>
                                                `).join('')}
                                            </ol>
                                            <h5>工作内容:</h5>
                                            <ol>
                                                ${item.workContent.map(workContent => `
                                                    <li>${workContent}</li>
                                                `).join('')}
                                            </ol>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                            <div class="resume-content-item">
                                <h1 class="resume-content-item-title">项目经历
                                    ${obj.projectExperience.url.map(url => `
                                        <a target="_blank" href="${url.url}">${url.name}</a>
                                    `).join('')}
                                </h1>
                                <ul>
                                    ${obj.projectExperience.list.map(list => `
                                        <li class="first">
                                            <span class="time">${list.time}</span>
                                            <div class="desc"><span>${list.desc}</span></div>
                                            <ol>
                                                ${list.list.map(item => `
                                                    <li>${item}</li>
                                                `).join('')}
                                            </ol>
                                        </li>
                                    `).join('')}
                                    
                                </ul>
                            </div>
                            <div class="resume-content-item">
                                <h1 class="resume-content-item-title">教育经历</h1>
                                <p class="education"><span class="left">${obj.educationExperience.education}</span><span class="right">${obj.educationExperience.time}</span></p>
                                <ul class="education">
                                    ${obj.educationExperience.data.map(data => `
                                        <li >
                                            <span >${data.time}</span>
                                            <p>${data.content}</p>
                                        </li>
                                    `).join('')}
                                   
                                </ul>
                            </div>
                            <div class="resume-content-item">
                                <h1 class="resume-content-item-title">技能skills</h1>
                                <div class="skills">
                                    ${obj.skillLevel.map(skillLevel => `
                                        <div class="item">
                                            <div class="skills-progress-out left">
                                                <div class="skills-progress-in" style="width: ${skillLevel.per};"></div>
                                            </div>
                                            <div class="skills-name right">${skillLevel.name}-${skillLevel.level}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                        `;
        }
    })  
}); 

/** class类和继承 */
var person = function() {
    var name = "default";
    return {
        getName: function() {
            return name;
        },
        setName: function(newName) {
            name = newName;
        }
    }
};
console.log(person().getName());
var p = new person();
var Jack = function(){};
Jack.prototype = new person();
Jack.prototype.say = function() {
    console.log("Hello, my name is Jack");
}
var j = new Jack();
j.setName("Jack");
j.say();
console.log(j.getName());
// console.log(person.name1);
/**原型链 */
var obj = {};
console.log(Object.prototype);
console.log(obj.__proto__);

/** this */
function Foo() {
    this.name = "hello";
    this.year = "2018";
    console.log("情况1："+this);
}

var f1 = new Foo();
console.log(f1);
Foo();

var obj = {
    x: 10,
    fn: function() {
        console.log("情况2："+this);
        console.log("情况2："+this.x);
    }
}

obj.fn();
