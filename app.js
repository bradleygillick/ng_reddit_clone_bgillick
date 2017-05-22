angular.module("app", [])

  .component("app", {

    controller: function () {
      const vm = this
      vm.showForm = false

      vm.$onInit = function () {
        vm.posts = [{
          title: "A Super Post",
          votes: 10,
          body: "This is the greatest post to ever be posted",
          author: "Brad Gillick",
          imageUrl: "https://images.pexels.com/photos/10651/photo-1432821596592-e2c18b78144f.jpeg?h=350&auto=compress&cs=tinysrgb",
          time: "05-20-2017",
          comments: ["Super cool, dude!"]
        }, {
          title: "The second Post",
          votes: 50,
          body: "This is actually the greatest post to ever be posted and should be displayed first",
          author: "Matt Gillick",
          imageUrl: "https://images.pexels.com/photos/203885/pexels-photo-203885.jpeg?h=350&auto=compress&cs=tinysrgb",
          time: "10-28-2016",
          comments: ["Super cool, matt!", "Way to go!"]
        }]
      }

      vm.submitForm = function () {
        vm.post.time = new Date()
        vm.post.comments = []
        vm.post.votes = 0
        vm.posts.push(vm.post)
        vm.toggleNewPost()
        delete vm.post
      }

      vm.toggleNewPost = function () {
        vm.showForm = !vm.showForm
      }
    },
    template: `
    <nav class="navbar navbar-default">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
          aria-expanded="false">w
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
        <a class="navbar-brand">Reddit Clone</a>
      </div>

      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      </div>
    </div>
  </nav>

  <main class="container">

    <div class="pull-right">
      <p><a id="post-button" ng-click="$ctrl.toggleNewPost()" class="btn btn-info">New Post</a></p>
    </div>
    <ul  class="nav nav-pills">
      <li role="presentation" class="active">
        <input ng-model="$ctrl.filterText" class="form-control input-sm search-form" placeholder="Filter">
      </li>

      <div ng-model="$ctrl.sortProperty" class="form-inline">
        <label for="sort">  Sort by </label>
        <select class="form-control" id="sort">
        <option>Title</option>
        <option>Date posted</option>
      </select>
      </div>
    </ul>

    <div class="row">
      <div class="col-md-8">

        <form ng-if="$ctrl.showForm == true" ng-submit="$ctrl.submitForm()">
          <div>
            <label for="title">Title</label>
            <input ng-model="$ctrl.post.title" id="title" class="form-control">
          </div>
          <div>
            <label for="body">Body</label>
            <textarea ng-model="$ctrl.post.body" id="body" class="form-control"></textarea>
          </div>
          <div>
            <label for="author">Author</label>
            <input ng-model="$ctrl.post.author" id="author" class="form-control">
          </div>
          <div>
            <label for="image-url">Image URL</label>
            <input ng-model="$ctrl.post.imageUrl" id="image-url" class="form-control">
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary">
            Create Post
          </button>
          </div>
        </form>

      </div>
    </div>

    <div ng-repeat="post in $ctrl.posts | orderBy:$sortProperty:true | filter:$ctrl.filterText">
    <div class="row">
      <div class="col-md-12">

        <div class="well">
          <div class="media-left">
            <img class="media-object">
          </div>
          <div class="media-body">
            <img class="pull-left post-image" src="{{post.imageUrl}}" alt="Post Image">
            <h4 class="media-heading">
              {{post.title}} |
              <a ng-click="post.votes = post.votes + 1"><i class="glyphicon glyphicon-arrow-up"></i></a>
              <a ng-click="post.votes = post.votes - 1"><i class="glyphicon glyphicon-arrow-down"></i></a> {{post.votes}}
            </h4>
            <div class="text-right">
              {{post.author}}
            </div>
            <p>
              {{post.body}}
            </p>
            <div>
              {{post.time}} |
              <i class="glyphicon glyphicon-comment"></i>
              <a ng-click="showComments = !showComments">
              <ng-pluralize
                count="post.comments.length"
                when="{'0': '0 Comments', 'one': '1 Comment', 'other': '{} Comments'}">
              </ng-pluralize>
            </a>
            </div>
            <div ng-if="showComments" class="row">
              <div class="col-md-offset-1">
                <hr>
                <p ng-repeat="comment in post.comments">
                {{comment}}
              </p>
                <form class="form-inline">
                  <div class="form-group">
                    <input class="form-control">
                  </div>
                  <div class="form-group">
                    <input type="submit" class="btn btn-primary">
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </main>
          `
  })