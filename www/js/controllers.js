angular.module('todo')
.controller('TodoController',['$scope','$timeout','$ionicModal','$ionicSideMenuDelegate','ProjectService',TodoController])

function TodoController($scope,$timeout,$ionicModal,$ionicSideMenuDelegate,ProjectService){
	var vm=this;

	vm.openNewTask=openNewTask;
	vm.closeNewTask=closeNewTask;
	vm.createTask=createTask;
	vm.createProject=createProject;
	vm.projects = ProjectService.all();
	vm.activeProject = vm.projects[ProjectService.getLastActiveIndex()];
	vm.newProject=newProject;
	vm.selectProject=selectProject;
	vm.toggleProjects=toggleProjects;
	vm.taskDone=taskDone;
	vm.taskDelete=taskDelete;

	$ionicModal.fromTemplateUrl('templates/new-task.html',function(modal){
			vm.taskModal=modal;
		},{
	    scope: $scope,
	    animation: 'slide-in-up'
	});

  	function openNewTask() {
	   	vm.taskModal.show();
	}

	function closeNewTask(){
		vm.taskModal.hide();
	}

	function createTask(task){
		if(!vm.activeProject || !task) {
	      return;
	    }
	    vm.activeProject.tasks.push({
	      id:new Date().getTime(),
	      title: task.title,
	      done:false
	    });
	    vm.taskModal.hide();
	    ProjectService.save(vm.projects);
	    task.title = "";
	}
	function createProject(projectTitle){
		var project=ProjectService.newProject(projectTitle);
		vm.projects.push(project);
		vm.selectProject(project,vm.projects.lenth-1);
	}

	function newProject(){
		var projectTitle = prompt('Project name');
		if(projectTitle) {
			createProject(projectTitle);
		}
	}

	function selectProject(project,index){
		vm.activeProject = project;
		ProjectService.setLastActiveIndex(index);
		$ionicSideMenuDelegate.toggleLeft(false);
	}

	function toggleProjects() {
    	$ionicSideMenuDelegate.toggleLeft();
  	}

  	function taskDone(task){
  		var activeProjectId=vm.activeProject.id;
  		var taskId=task.id;
		ProjectService.taskDone(activeProjectId,taskId);
		vm.projects = ProjectService.all();
		vm.activeProject = vm.projects[ProjectService.getLastActiveIndex()];

	}
	function taskDelete(task){
  		var activeProjectId=vm.activeProject.id;
  		var taskId=task.id;
		ProjectService.taskDelete(activeProjectId,taskId);
		vm.projects = ProjectService.all();
		vm.activeProject = vm.projects[ProjectService.getLastActiveIndex()];
	}
  	$timeout(function(){
  		if(vm.projects.length===0){
  			while(true){
  				var projectTitle = prompt('Your first project title:');
				if(projectTitle) {
				  createProject(projectTitle);
				  break;
				}
  			}
  		}
  	})
}