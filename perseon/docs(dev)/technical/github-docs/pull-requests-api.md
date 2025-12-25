# GitHub REST API Endpoints for Pull Requests

The REST API is now versioned. For more information, see "[About API versioning](https://docs.github.com/rest/overview/api-versions)."

## Use the REST API to interact with pull requests.

---

## About pull requests

You can list, view, edit, create, and merge pull requests using the REST API. For information about how to interact with comments on a pull request, see [REST API endpoints for issue comments](https://docs.github.com/en/rest/issues/comments).

Pull requests are a type of issue. Any actions that are available in both pull requests and issues, like managing assignees, labels, and milestones, are handled by the REST API to manage issues. To perform these actions on pull requests, you must use the issues API endpoints (for example, `/repos/{owner}/{repo}/issues/{issue_number}`), not the pull requests endpoints. For more information, see [REST API endpoints for issues](https://docs.github.com/en/rest/issues).

### Link Relations

Pull requests have these possible link relations:

- `self`: The API location of this pull request
- `html`: The HTML location of this pull request
- `issue`: The API location of this pull request's [issue](https://docs.github.com/en/rest/issues)
- `comments`: The API location of this pull request's [issue comments](https://docs.github.com/en/rest/issues/comments)
- `review_comments`: The API location of this pull request's [review comments](https://docs.github.com/en/rest/pulls/comments)
- `review_comment`: The [URL template](https://docs.github.com/en/rest/using-the-rest-api/getting-started-with-the-rest-api#hypermedia) to construct the API location for a [review comment](https://docs.github.com/en/rest/pulls/comments) in this pull request's repository
- `commits`: The API location of this pull request's [commits](https://docs.github.com/en/rest/pulls/pulls#list-commits-on-a-pull-request)
- `statuses`: The API location of this pull request's [commit statuses](https://docs.github.com/en/rest/commits#commit-statuses), which are the statuses of its `head` branch

---

## List pull requests

Lists pull requests in a specified repository.

Draft pull requests are available in public repositories with GitHub Free and GitHub Free for organizations, GitHub Pro, and legacy per-repository billing plans, and in public and private repositories with GitHub Team and GitHub Enterprise Cloud. For more information, see [GitHub's products](https://docs.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation.

This endpoint supports the following custom media types. For more information, see "[Media types](https://docs.github.com/rest/using-the-rest-api/getting-started-with-the-rest-api#media-types)."

- **`application/vnd.github.raw+json`**: Returns the raw markdown body. Response will include `body`. This is the default if you do not pass any specific media type.
- **`application/vnd.github.text+json`**: Returns a text only representation of the markdown body. Response will include `body_text`.
- **`application/vnd.github.html+json`**: Returns HTML rendered from the body's markdown. Response will include `body_html`.
- **`application/vnd.github.full+json`**: Returns raw, text, and HTML representations. Response will include `body`, `body_text`, and `body_html`.

### Fine-grained access tokens for "List pull requests"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Pull requests" repository permissions (read)

This endpoint can be used without authentication or the aforementioned permissions if only public resources are requested.

### Parameters for "List pull requests"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `owner`stringRequired<br>The account owner of the repository. The name is not case sensitive. |
| `repo`stringRequired<br>The name of the repository without the `.git` extension. The name is not case sensitive. |

Path parameters

| Name, Type, Description |
| --- |
| `state`string<br>Either `open`, `closed`, or `all` to filter by state.<br>Default: `open`<br>Can be one of:`open`,`closed`,`all` |
| `head`string<br>Filter pulls by head user or head organization and branch name in the format of `user:ref-name` or `organization:ref-name`. For example: `github:new-script-format` or `octocat:test-branch`. |
| `base`string<br>Filter pulls by base branch name. Example: `gh-pages`. |
| `sort`string<br>What to sort results by. `popularity` will sort by the number of comments. `long-running` will sort by date created and will limit the results to pull requests that have been open for more than a month and have had activity within the past month.<br>Default: `created`<br>Can be one of:`created`,`updated`,`popularity`,`long-running` |
| `direction`string<br>The direction of the sort. Default: `desc` when sort is `created` or sort is not specified, otherwise `asc`.<br>Can be one of:`asc`,`desc` |
| `per_page`integer<br>The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)."<br>Default: `30` |
| `page`integer<br>The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)."<br>Default: `1` |

Query parameters

### HTTP response status codes for "List pull requests"

| Status code | Description |
| --- | --- |
| `200` | OK |
| `304` | Not modified |
| `422` | Validation failed, or the endpoint has been spammed. |

### Code samples for "List pull requests"

#### Request example

get/repos/{owner}/{repo}/pulls

- cURL
- JavaScript
- GitHub CLI

Copy to clipboard curl request example

`curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/repos/OWNER/REPO/pulls`

#### Response

- Example response
- Response schema

Status: 200

```json
[
  {
      "url": "https://api.github.com/repos/octocat/Hello-World/pulls/1347",
      "id": 1,
      "node_id": "MDExOlB1bGxSZXF1ZXN0MQ==",
      "html_url": "https://github.com/octocat/Hello-World/pull/1347",
      "diff_url": "https://github.com/octocat/Hello-World/pull/1347.diff",
      "patch_url": "https://github.com/octocat/Hello-World/pull/1347.patch",
      "issue_url": "https://api.github.com/repos/octocat/Hello-World/issues/1347",
      "commits_url": "https://api.github.com/repos/octocat/Hello-World/pulls/1347/commits",
      "review_comments_url": "https://api.github.com/repos/octocat/Hello-World/pulls/1347/comments",
      "review_comment_url": "https://api.github.com/repos/octocat/Hello-World/pulls/comments{/number}",
      "comments_url": "https://api.github.com/repos/octocat/Hello-World/issues/1347/comments",
      "statuses_url": "https://api.github.com/repos/octocat/Hello-World/statuses/6dcb09b5b57875f334f61aebed695e2e4193db5e",
      "number": 1347,
      "state": "open",
      "locked": true,
      "title": "Amazing new feature",
      "user": {
        "login": "octocat",
        "id": 1,
        "node_id": "MDQ6VXNlcjE=",
        "avatar_url": "https://github.com/images/error/octocat_happy.gif",
        "gravatar_id": "",
        "url": "https://api.github.com/users/octocat",
        "html_url": "https://github.com/octocat",
        "followers_url": "https://api.github.com/users/octocat/followers",
        "following_url": "https://api.github.com/users/octocat/following{/other_user}",
        "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
        "organizations_url": "https://api.github.com/users/octocat/orgs",
        "repos_url": "https://api.github.com/users/octocat/repos",
        "events_url": "https://api.github.com/users/octocat/events{/privacy}",
        "received_events_url": "https://api.github.com/users/octocat/received_events",
        "type": "User",
        "site_admin": false
      },
      "body": "Please pull these awesome changes in!",
      "labels": [
        {
          "id": 208045946,
          "node_id": "MDU6TGFiZWwyMDgwNDU5NDY=",
          "url": "https://api.github.com/repos/octocat/Hello-World/labels/bug",
          "name": "bug",
          "description": "Something isn't working",
          "color": "f29513",
          "default": true
        }
      ],
      "milestone": {
        "url": "https://api.github.com/repos/octocat/Hello-World/milestones/1",
        "html_url": "https://github.com/octocat/Hello-World/milestones/v1.0",
        "labels_url": "https://api.github.com/repos/octocat/Hello-World/milestones/1/labels",
        "id": 1002604,
        "node_id": "MDk6TWlsZXN0b25lMTAwMjYwNA==",
        "number": 1,
        "state": "open",
        "title": "v1.0",
        "description": "Tracking milestone for version 1.0",
        "creator": {
          "login": "octocat",
          "id": 1,
          "node_id": "MDQ6VXNlcjE=",
          "avatar_url": "https://github.com/images/error/octocat_happy.gif",
          "gravatar_id": "",
          "url": "https://api.github.com/users/octocat",
          "html_url": "https://github.com/octocat",
          "followers_url": "https://api.github.com/users/octocat/followers",
          "following_url": "https://api.github.com/users/octocat/following{/other_user}",
          "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
          "organizations_url": "https://api.github.com/users/octocat/orgs",
          "repos_url": "https://api.github.com/users/octocat/repos",
          "events_url": "https://api.github.com/users/octocat/events{/privacy}",
          "received_events_url": "https://api.github.com/users/octocat/received_events",
          "type": "User",
          "site_admin": false
        },
        "open_issues": 4,
        "closed_issues": 8,
        "created_at": "2011-04-10T20:09:31Z",
        "updated_at": "2014-03-03T18:58:10Z",
        "closed_at": "2013-02-12T13:22:01Z",
        "due_on": "2012-10-09T23:39:01Z"
      },
      "active_lock_reason": "too heated",
      "created_at": "2011-01-26T19:01:12Z",
      "updated_at": "2011-01-26T19:01:12Z",
      "closed_at": "2011-01-26T19:01:12Z",
      "merged_at": "2011-01-26T19:01:12Z",
      "merge_commit_sha": "e5bd3914e2e596debea16f433f57875b5b90bcd6",
      "assignee": {
        "login": "octocat",
        "id": 1,
        "node_id": "MDQ6VXNlcjE=",
        "avatar_url": "https://github.com/images/error/octocat_happy.gif",
        "gravatar_id": "",
        "url": "https://api.github.com/users/octocat",
        "html_url": "https://github.com/octocat",
        "followers_url": "https://api.github.com/users/octocat/followers",
        "following_url": "https://api.github.com/users/octocat/following{/other_user}",
        "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
        "organizations_url": "https://api.github.com/users/octocat/orgs",
        "repos_url": "https://api.github.com/users/octocat/repos",
        "events_url": "https://api.github.com/users/octocat/events{/privacy}",
        "received_events_url": "https://api.github.com/users/octocat/received_events",
        "type": "User",
        "site_admin": false
      },
      "assignees": [
        {
          "login": "octocat",
          "id": 1,
          "node_id": "MDQ6VXNlcjE=",
          "avatar_url": "https://github.com/images/error/octocat_happy.gif",
          "gravatar_id": "",
          "url": "https://api.github.com/users/octocat",
          "html_url": "https://github.com/octocat",
          "followers_url": "https://api.github.com/users/octocat/followers",
          "following_url": "https://api.github.com/users/octocat/following{/other_user}",
          "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
          "organizations_url": "https://api.github.com/users/octocat/orgs",
          "repos_url": "https://api.github.com/users/octocat/repos",
          "events_url": "https://api.github.com/users/octocat/events{/privacy}",
          "received_events_url": "https://api.github.com/users/octocat/received_events",
          "type": "User",
          "site_admin": false
        },
        {
          "login": "hubot",
          "id": 1,
          "node_id": "MDQ6VXNlcjE=",
          "avatar_url": "https://github.com/images/error/hubot_happy.gif",
          "gravatar_id": "",
          "url": "https://api.github.com/users/hubot",
          "html_url": "https://github.com/hubot",
          "followers_url": "https://api.github.com/users/hubot/followers",
          "following_url": "https://api.github.com/users/hubot/following{/other_user}",
          "gists_url": "https://api.github.com/users/hubot/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/hubot/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/hubot/subscriptions",
          "organizations_url": "https://api.github.com/users/hubot/orgs",
          "repos_url": "https://api.github.com/users/hubot/repos",
          "events_url": "https://api.github.com/users/hubot/events{/privacy}",
          "received_events_url": "https://api.github.com/users/hubot/received_events",
          "type": "User",
          "site_admin": true
        }
      ],
      "requested_reviewers": [
        {
          "login": "other_user",
          "id": 1,
          "node_id": "MDQ6VXNlcjE=",
          "avatar_url": "https://github.com/images/error/other_user_happy.gif",
          "gravatar_id": "",
          "url": "https://api.github.com/users/other_user",
          "html_url": "https://github.com/other_user",
          "followers_url": "https://api.github.com/users/other_user/followers",
          "following_url": "https://api.github.com/users/other_user/following{/other_user}",
          "gists_url": "https://api.github.com/users/other_user/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/other_user/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/other_user/subscriptions",
          "organizations_url": "https://api.github.com/users/other_user/orgs",
          "repos_url": "https://api.github.com/users/other_user/repos",
          "events_url": "https://api.github.com/users/other_user/events{/privacy}",
          "received_events_url": "https://api.github.com/users/other_user/received_events",
          "type": "User",
          "site_admin": false
        }
      ],
      "requested_teams": [
        {
          "id": 1,
          "node_id": "MDQ6VGVhbTE=",
          "url": "https://api.github.com/teams/1",
          "html_url": "https://github.com/orgs/github/teams/justice-league",
          "name": "Justice League",
          "slug": "justice-league",
          "description": "A great team.",
          "privacy": "closed",
          "notification_setting": "notifications_enabled",
          "permission": "admin",
          "members_url": "https://api.github.com/teams/1/members{/member}",
          "repositories_url": "https://api.github.com/teams/1/repos",
          "parent": null
        }
      ],
      "head": {
        "label": "octocat:new-topic",
        "ref": "new-topic",
        "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e",
        "user": {
          "login": "octocat",
          "id": 1,
          "node_id": "MDQ6VXNlcjE=",
          "avatar_url": "https://github.com/images/error/octocat_happy.gif",
          "gravatar_id": "",
          "url": "https://api.github.com/users/octocat",
          "html_url": "https://github.com/octocat",
          "followers_url": "https://api.github.com/users/octocat/followers",
          "following_url": "https://api.github.com/users/octocat/following{/other_user}",
          "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
          "organizations_url": "https://api.github.com/users/octocat/orgs",
          "repos_url": "https://api.github.com/users/octocat/repos",
          "events_url": "https://api.github.com/users/octocat/events{/privacy}",
          "received_events_url": "https://api.github.com/users/octocat/received_events",
          "type": "User",
          "site_admin": false
        },
        "repo": {
          "id": 1296269,
          "node_id": "MDEwOlJlcG9zaXRvcnkxMjk2MjY5",
          "name": "Hello-World",
          "full_name": "octocat/Hello-World",
          "owner": {
            "login": "octocat",
            "id": 1,
            "node_id": "MDQ6VXNlcjE=",
            "avatar_url": "https://github.com/images/error/octocat_happy.gif",
            "gravatar_id": "",
            "url": "https://api.github.com/users/octocat",
            "html_url": "https://github.com/octocat",
            "followers_url": "https://api.github.com/users/octocat/followers",
            "following_url": "https://api.github.com/users/octocat/following{/other_user}",
            "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
            "organizations_url": "https://api.github.com/users/octocat/orgs",
            "repos_url": "https://api.github.com/users/octocat/repos",
            "events_url": "https://api.github.com/users/octocat/events{/privacy}",
            "received_events_url": "https://api.github.com/users/octocat/received_events",
            "type": "User",
            "site_admin": false
          },
          "private": false,
          "html_url": "https://github.com/octocat/Hello-World",
          "description": "This your first repo!",
          "fork": false,
          "url": "https://api.github.com/repos/octocat/Hello-World",
          "archive_url": "https://api.github.com/repos/octocat/Hello-World/{archive_format}{/ref}",
          "assignees_url": "https://api.github.com/repos/octocat/Hello-World/assignees{/user}",
          "blobs_url": "https://api.github.com/repos/octocat/Hello-World/git/blobs{/sha}",
          "branches_url": "https://api.github.com/repos/octocat/Hello-World/branches{/branch}",
          "collaborators_url": "https://api.github.com/repos/octocat/Hello-World/collaborators{/collaborator}",
          "comments_url": "https://api.github.com/repos/octocat/Hello-World/comments{/number}",
          "commits_url": "https://api.github.com/repos/octocat/Hello-World/commits{/sha}",
          "compare_url": "https://api.github.com/repos/octocat/Hello-World/compare/{base}...{head}",
          "contents_url": "https://api.github.com/repos/octocat/Hello-World/contents/{+path}",
          "contributors_url": "https://api.github.com/repos/octocat/Hello-World/contributors",
          "deployments_url": "https://api.github.com/repos/octocat/Hello-World/deployments",
          "downloads_url": "https://api.github.com/repos/octocat/Hello-World/downloads",
          "events_url": "https://api.github.com/repos/octocat/Hello-World/events",
          "forks_url": "https://api.github.com/repos/octocat/Hello-World/forks",
          "git_commits_url": "https://api.github.com/repos/octocat/Hello-World/git/commits{/sha}",
          "git_refs_url": "https://api.github.com/repos/octocat/Hello-World/git/refs{/sha}",
          "git_tags_url": "https://api.github.com/repos/octocat/Hello-World/git/tags{/sha}",
          "git_url": "git:github.com/octocat/Hello-World.git",
          "issue_comment_url": "https://api.github.com/repos/octocat/Hello-World/issues/comments{/number}",
          "issue_events_url": "https://api.github.com/repos/octocat/Hello-World/issues/events{/number}",
          "issues_url": "https://api.github.com/repos/octocat/Hello-World/issues{/number}",
          "keys_url": "https://api.github.com/repos/octocat/Hello-World/keys{/key_id}",
          "labels_url": "https://api.github.com/repos/octocat/Hello-World/labels{/name}",
          "languages_url": "https://api.github.com/repos/octocat/Hello-World/languages",
          "merges_url": "https://api.github.com/repos/octocat/Hello-World/merges",
          "milestones_url": "https://api.github.com/repos/octocat/Hello-World/milestones{/number}",
          "notifications_url": "https://api.github.com/repos/octocat/Hello-World/notifications{?since,all,participating}",
          "pulls_url": "https://api.github.com/repos/octocat/Hello-World/pulls{/number}",
          "releases_url": "https://api.github.com/repos/octocat/Hello-World/releases{/id}",
          "ssh_url": "git@github.com:octocat/Hello-World.git",
          "stargazers_url": "https://github.com/repos/octocat/Hello-World/stargazers",
          "statuses_url": "https://api.github.com/repos/octocat/Hello-World/statuses/{sha}",
          "subscribers_url": "https://api.github.com/repos/octocat/Hello-World/subscribers",
          "subscription_url": "https://api.github.com/repos/octocat/Hello-World/subscription",
          "tags_url": "https://api.github.com/repos/octocat/Hello-World/tags",
          "teams_url": "https://api.github.com/repos/octocat/Hello-World/teams",
          "trees_url": "https://api.github.com/repos/octocat/Hello-World/git/trees{/sha}",
          "clone_url": "https://github.com/octocat/Hello-World.git",
          "mirror_url": "git:git.example.com/octocat/Hello-World",
          "hooks_url": "https://api.github.com/repos/octocat/Hello-World/hooks",
          "svn_url": "https://svn.github.com/octocat/Hello-World",
          "homepage": "https://github.com",
          "language": null,
          "forks_count": 9,
          "stargazers_count": 80,
          "watchers_count": 80,
          "size": 108,
          "default_branch": "master",
          "open_issues_count": 0,
          "topics": [
            "octocat",
            "atom",
            "electron",
            "api"
          ],
          "has_issues": true,
          "has_projects": true,
          "has_wiki": true,
          "has_pages": false,
          "has_downloads": true,
          "has_discussions": false,
          "archived": false,
          "disabled": false,
          "visibility": "public",
          "pushed_at": "2011-01-26T19:06:43Z",
          "created_at": "2011-01-26T19:01:12Z",
          "updated_at": "2011-01-26T19:14:43Z",
          "permissions": {
            "admin": false,
            "push": false,
            "pull": true
          },
          "allow_rebase_merge": true,
          "temp_clone_token": "ABTLWHOULUVAXGTRYU7OC2876QJ2O",
          "allow_squash_merge": true,
          "allow_merge_commit": true,
          "allow_forking": true,
          "forks": 123,
          "open_issues": 123,
          "license": {
            "key": "mit",
            "name": "MIT License",
            "url": "https://api.github.com/licenses/mit",
            "spdx_id": "MIT",
            "node_id": "MDc6TGljZW5zZW1pdA=="
          },
          "watchers": 123
        }
      },
      "base": {
        "label": "octocat:master",
        "ref": "master",
        "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e",
        "user": {
          "login": "octocat",
          "id": 1,
          "node_id": "MDQ6VXNlcjE=",
          "avatar_url": "https://github.com/images/error/octocat_happy.gif",
          "gravatar_id": "",
          "url": "https://api.github.com/users/octocat",
          "html_url": "https://github.com/octocat",
          "followers_url": "https://api.github.com/users/octocat/followers",
          "following_url": "https://api.github.com/users/octocat/following{/other_user}",
          "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
          "organizations_url": "https://api.github.com/users/octocat/orgs",
          "repos_url": "https://api.github.com/users/octocat/repos",
          "events_url": "https://api.github.com/users/octocat/events{/privacy}",
          "received_events_url": "https://api.github.com/users/octocat/received_events",
          "type": "User",
          "site_admin": false
        },
        "repo": {
          "id": 1296269,
          "node_id": "MDEwOlJlcG9zaXRvcnkxMjk2MjY5",
          "name": "Hello-World",
          "full_name": "octocat/Hello-World",
          "owner": {
            "login": "octocat",
            "id": 1,
            "node_id": "MDQ6VXNlcjE=",
            "avatar_url": "https://github.com/images/error/octocat_happy.gif",
            "gravatar_id": "",
            "url": "https://api.github.com/users/octocat",
            "html_url": "https://github.com/octocat",
            "followers_url": "https://api.github.com/users/octocat/followers",
            "following_url": "https://api.github.com/users/octocat/following{/other_user}",
            "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
            "organizations_url": "https://api.github.com/users/octocat/orgs",
            "repos_url": "https://api.github.com/users/octocat/repos",
            "events_url": "https://api.github.com/users/octocat/events{/privacy}",
            "received_events_url": "https://api.github.com/users/octocat/received_events",
            "type": "User",
            "site_admin": false
          },
          "private": false,
          "html_url": "https://github.com/octocat/Hello-World",
          "description": "This your first repo!",
          "fork": false,
          "url": "https://api.github.com/repos/octocat/Hello-World",
          "archive_url": "https://api.github.com/repos/octocat/Hello-World/{archive_format}{/ref}",
          "assignees_url": "https://api.github.com/repos/octocat/Hello-World/assignees{/user}",
          "blobs_url": "https://api.github.com/repos/octocat/Hello-World/git/blobs{/sha}",
          "branches_url": "https://api.github.com/repos/octocat/Hello-World/branches{/branch}",
          "collaborators_url": "https://api.github.com/repos/octocat/Hello-World/collaborators{/collaborator}",
          "comments_url": "https://api.github.com/repos/octocat/Hello-World/comments{/number}",
          "commits_url": "https://api.github.com/repos/octocat/Hello-World/commits{/sha}",
          "compare_url": "https://api.github.com/repos/octocat/Hello-World/compare/{base}...{head}",
          "contents_url": "https://api.github.com/repos/octocat/Hello-World/contents/{+path}",
          "contributors_url": "https://api.github.com/repos/octocat/Hello-World/contributors",
          "deployments_url": "https://api.github.com/repos/octocat/Hello-World/deployments",
          "downloads_url": "https://api.github.com/repos/octocat/Hello-World/downloads",
          "events_url": "https://api.github.com/repos/octocat/Hello-World/events",
          "forks_url": "https://api.github.com/repos/octocat/Hello-World/forks",
          "git_commits_url": "https://api.github.com/repos/octocat/Hello-World/git/commits{/sha}",
          "git_refs_url": "https://api.github.com/repos/octocat/Hello-World/git/refs{/sha}",
          "git_tags_url": "https://api.github.com/repos/octocat/Hello-World/git/tags{/sha}",
          "git_url": "git:github.com/octocat/Hello-World.git",
          "issue_comment_url": "https://api.github.com/repos/octocat/Hello-World/issues/comments{/number}",
          "issue_events_url": "https://api.github.com/repos/octocat/Hello-World/issues/events{/number}",
          "issues_url": "https://api.github.com/repos/octocat/Hello-World/issues{/number}",
          "keys_url": "https://api.github.com/repos/octocat/Hello-World/keys{/key_id}",
          "labels_url": "https://api.github.com/repos/octocat/Hello-World/labels{/name}",
          "languages_url": "https://api.github.com/repos/octocat/Hello-World/languages",
          "merges_url": "https://api.github.com/repos/octocat/Hello-World/merges",
          "milestones_url": "https://api.github.com/repos/octocat/Hello-World/milestones{/number}",
          "notifications_url": "https://api.github.com/repos/octocat/Hello-World/notifications{?since,all,participating}",
          "pulls_url": "https://api.github.com/repos/octocat/Hello-World/pulls{/number}",
          "releases_url": "https://api.github.com/repos/octocat/Hello-World/releases{/id}",
          "ssh_url": "git@github.com:octocat/Hello-World.git",
          "stargazers_url": "https://github.com/repos/octocat/Hello-World/stargazers",
          "statuses_url": "https://api.github.com/repos/octocat/Hello-World/statuses/{sha}",
          "subscribers_url": "https://api.github.com/repos/octocat/Hello-World/subscribers",
          "subscription_url": "https://api.github.com/repos/octocat/Hello-World/subscription",
          "tags_url": "https://api.github.com/repos/octocat/Hello-World/tags",
          "teams_url": "https://api.github.com/repos/octocat/Hello-World/teams",
          "trees_url": "https://api.github.com/repos/octocat/Hello-World/git/trees{/sha}",
          "clone_url": "https://github.com/octocat/Hello-World.git",
          "mirror_url": "git:git.example.com/octocat/Hello-World",
          "hooks_url": "https://api.github.com/repos/octocat/Hello-World/hooks",
          "svn_url": "https://svn.github.com/octocat/Hello-World",
          "homepage": "https://github.com",
          "language": null,
          "forks_count": 9,
          "stargazers_count": 80,
          "watchers_count": 80,
          "size": 108,
          "default_branch": "master",
          "open_issues_count": 0,
          "topics": [
            "octocat",
            "atom",
            "electron",
            "api"
          ],
          "has_issues": true,
          "has_projects": true,
          "has_wiki": true,
          "has_pages": false,
          "has_downloads": true,
          "has_discussions": false,
          "archived": false,
          "disabled": false,
          "visibility": "public",
          "pushed_at": "2011-01-26T19:06:43Z",
          "created_at": "2011-01-26T19:01:12Z",
          "updated_at": "2011-01-26T19:14:43Z",
          "permissions": {
            "admin": false,
            "push": false,
            "pull": true
          },
          "allow_rebase_merge": true,
          "temp_clone_token": "ABTLWHOULUVAXGTRYU7OC2876QJ2O",
          "allow_squash_merge": true,
          "allow_merge_commit": true,
          "forks": 123,
          "open_issues": 123,
          "license": {
            "key": "mit",
            "name": "MIT License",
            "url": "https://api.github.com/licenses/mit",
            "spdx_id": "MIT",
            "node_id": "MDc6TGljZW5zZW1pdA=="
          },
          "watchers": 123
        }
      },
      "_links": {
        "self": {
          "href": "https://api.github.com/repos/octocat/Hello-World/pulls/1347"
        },
        "html": {
          "href": "https://github.com/octocat/Hello-World/pull/1347"
        },
        "issue": {
          "href": "https://api.github.com/repos/octocat/Hello-World/issues/1347"
        },
        "comments": {
          "href": "https://api.github.com/repos/octocat/Hello-World/issues/1347/comments"
        },
        "review_comments": {
          "href": "https://api.github.com/repos/octocat/Hello-World/pulls/1347/comments"
        },
        "review_comment": {
          "href": "https://api.github.com/repos/octocat/Hello-World/pulls/comments{/number}"
        },
        "commits": {
          "href": "https://api.github.com/repos/octocat/Hello-World/pulls/1347/commits"
        },
        "statuses": {
          "href": "https://api.github.com/repos/octocat/Hello-World/statuses/6dcb09b5b57875f334f61aebed695e2e4193db5e"
        }
      },
      "author_association": "OWNER",
      "auto_merge": null,
      "draft": false,
      "merged": false,
      "mergeable": true,
      "rebaseable": true,
      "mergeable_state": "clean",
      "merged_by": {
        "login": "octocat",
        "id": 1,
        "node_id": "MDQ6VXNlcjE=",
        "avatar_url": "https://github.com/images/error/octocat_happy.gif",
        "gravatar_id": "",
        "url": "https://api.github.com/users/octocat",
        "html_url": "https://github.com/octocat",
        "followers_url": "https://api.github.com/users/octocat/followers",
        "following_url": "https://api.github.com/users/octocat/following{/other_user}",
        "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
        "organizations_url": "https://api.github.com/users/octocat/orgs",
        "repos_url": "https://api.github.com/users/octocat/repos",
        "events_url": "https://api.github.com/users/octocat/events{/privacy}",
        "received_events_url": "https://api.github.com/users/octocat/received_events",
        "type": "User",
        "site_admin": false
      },
      "comments": 10,
      "review_comments": 0,
      "maintainer_can_modify": true,
      "commits": 3,
      "additions": 100,
      "deletions": 3,
      "changed_files": 5
  }
]
```

---

## Create a pull request

Draft pull requests are available in public repositories with GitHub Free and GitHub Free for organizations, GitHub Pro, and legacy per-repository billing plans, and in public and private repositories with GitHub Team and GitHub Enterprise Cloud. For more information, see [GitHub's products](https://docs.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation.

To open or update a pull request in a public repository, you must have write access to the head or the source branch. For organization-owned repositories, you must be a member of the organization that owns the repository to open or update a pull request.

This endpoint triggers [notifications](https://docs.github.com/github/managing-subscriptions-and-notifications-on-github/about-notifications). Creating content too quickly using this endpoint may result in secondary rate limiting. For more information, see "[Rate limits for the API](https://docs.github.com/rest/using-the-rest-api/rate-limits-for-the-rest-api#about-secondary-rate-limits)" and "[Best practices for using the REST API](https://docs.github.com/rest/guides/best-practices-for-using-the-rest-api)."

This endpoint supports the following custom media types. For more information, see "[Media types](https://docs.github.com/rest/using-the-rest-api/getting-started-with-the-rest-api#media-types)."

- **`application/vnd.github.raw+json`**: Returns the raw markdown body. Response will include `body`. This is the default if you do not pass any specific media type.
- **`application/vnd.github.text+json`**: Returns a text only representation of the markdown body. Response will include `body_text`.
- **`application/vnd.github.html+json`**: Returns HTML rendered from the body's markdown. Response will include `body_html`.
- **`application/vnd.github.full+json`**: Returns raw, text, and HTML representations. Response will include `body`, `body_text`, and `body_html`.

### Fine-grained access tokens for "Create a pull request"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Pull requests" repository permissions (write)

### Parameters for "Create a pull request"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `owner`stringRequired<br>The account owner of the repository. The name is not case sensitive. |
| `repo`stringRequired<br>The name of the repository without the `.git` extension. The name is not case sensitive. |

Path parameters

| Name, Type, Description |
| --- |
| `title`string<br>The title of the new pull request. Required unless `issue` is specified. |
| `head`stringRequired<br>The name of the branch where your changes are implemented. For cross-repository pull requests in the same network, namespace `head` with a user like this: `username:branch`. |
| `head_repo`string<br>The name of the repository where the changes in the pull request were made. This field is required for cross-repository pull requests if both repositories are owned by the same organization. |
| `base`stringRequired<br>The name of the branch you want the changes pulled into. This should be an existing branch on the current repository. You cannot submit a pull request to one repository that requests a merge to a base of another repository. |
| `body`string<br>The contents of the pull request. |
| `maintainer_can_modify`boolean<br>Indicates whether [maintainers can modify](https://docs.github.com/articles/allowing-changes-to-a-pull-request-branch-created-from-a-fork/) the pull request. |
| `draft`boolean<br>Indicates whether the pull request is a draft. See "[Draft Pull Requests](https://docs.github.com/articles/about-pull-requests#draft-pull-requests)" in the GitHub Help documentation to learn more. |
| `issue`integer<br>An issue in the repository to convert to a pull request. The issue title, body, and comments will become the title, body, and comments on the new pull request. Required unless `title` is specified. |

Body parameters

### HTTP response status codes for "Create a pull request"

| Status code | Description |
| --- | --- |
| `201` | Created |
| `403` | Forbidden |
| `422` | Validation failed, or the endpoint has been spammed. |

### Code samples for "Create a pull request"

#### Request example

post/repos/{owner}/{repo}/pulls

- cURL
- JavaScript
- GitHub CLI

Copy to clipboard curl request example

`curl -L \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/repos/OWNER/REPO/pulls \
  -d '{"title":"Amazing new feature","body":"Please pull these awesome changes in!","head":"octocat:new-feature","base":"master"}'`

#### Response

- Example response
- Response schema

Status: 201

[Full JSON response schema available in original documentation]

---

## Get a pull request

Draft pull requests are available in public repositories with GitHub Free and GitHub Free for organizations, GitHub Pro, and legacy per-repository billing plans, and in public and private repositories with GitHub Team and GitHub Enterprise Cloud. For more information, see [GitHub's products](https://docs.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation.

Lists details of a pull request by providing its number.

When you get, [create](https://docs.github.com/rest/pulls/pulls/#create-a-pull-request), or [edit](https://docs.github.com/rest/pulls/pulls#update-a-pull-request) a pull request, GitHub creates a merge commit to test whether the pull request can be automatically merged into the base branch. This test commit is not added to the base branch or the head branch. You can review the status of the test commit using the `mergeable` key. For more information, see "[Checking mergeability of pull requests](https://docs.github.com/rest/guides/getting-started-with-the-git-database-api#checking-mergeability-of-pull-requests)".

The value of the `mergeable` attribute can be `true`, `false`, or `null`. If the value is `null`, then GitHub has started a background job to compute the mergeability. After giving the job time to complete, resubmit the request. When the job finishes, you will see a non-`null` value for the `mergeable` attribute in the response. If `mergeable` is `true`, then `merge_commit_sha` will be the SHA of the _test_ merge commit.

The value of the `merge_commit_sha` attribute changes depending on the state of the pull request. Before merging a pull request, the `merge_commit_sha` attribute holds the SHA of the _test_ merge commit. After merging a pull request, the `merge_commit_sha` attribute changes depending on how you merged the pull request:

- If merged as a [merge commit](https://docs.github.com/articles/about-merge-methods-on-github/), `merge_commit_sha` represents the SHA of the merge commit.
- If merged via a [squash](https://docs.github.com/articles/about-merge-methods-on-github/#squashing-your-merge-commits), `merge_commit_sha` represents the SHA of the squashed commit on the base branch.
- If [rebased](https://docs.github.com/articles/about-merge-methods-on-github/#rebasing-and-merging-your-commits), `merge_commit_sha` represents the commit that the base branch was updated to.

Pass the appropriate [media type](https://docs.github.com/rest/using-the-rest-api/getting-started-with-the-rest-api#media-types) to fetch diff and patch formats.

This endpoint supports the following custom media types. For more information, see "[Media types](https://docs.github.com/rest/using-the-rest-api/getting-started-with-the-rest-api#media-types)."

- **`application/vnd.github.raw+json`**: Returns the raw markdown body. Response will include `body`. This is the default if you do not pass any specific media type.
- **`application/vnd.github.text+json`**: Returns a text only representation of the markdown body. Response will include `body_text`.
- **`application/vnd.github.html+json`**: Returns HTML rendered from the body's markdown. Response will include `body_html`.
- **`application/vnd.github.full+json`**: Returns raw, text, and HTML representations. Response will include `body`, `body_text`, and `body_html`.
- **`application/vnd.github.diff`**: For more information, see "[git-diff](https://git-scm.com/docs/git-diff)" in the Git documentation. If a diff is corrupt, contact us through the [GitHub Support portal](https://support.github.com/). Include the repository name and pull request ID in your message.

### Fine-grained access tokens for "Get a pull request"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have at least one of the following permission sets:

- "Pull requests" repository permissions (read)
- "Contents" repository permissions (read)

This endpoint can be used without authentication or the aforementioned permissions if only public resources are requested.

### Parameters for "Get a pull request"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `owner`stringRequired<br>The account owner of the repository. The name is not case sensitive. |
| `repo`stringRequired<br>The name of the repository without the `.git` extension. The name is not case sensitive. |
| `pull_number`integerRequired<br>The number that identifies the pull request. |

Path parameters

### HTTP response status codes for "Get a pull request"

| Status code | Description |
| --- | --- |
| `200` | Pass the appropriate [media type](https://docs.github.com/rest/using-the-rest-api/getting-started-with-the-rest-api#media-types) to fetch diff and patch formats. |
| `304` | Not modified |
| `404` | Resource not found |
| `406` | Unacceptable |
| `500` | Internal Error |
| `503` | Service unavailable |

### Code samples for "Get a pull request"

#### Request example

get/repos/{owner}/{repo}/pulls/{pull_number}

- cURL
- JavaScript
- GitHub CLI

Copy to clipboard curl request example

`curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/repos/OWNER/REPO/pulls/PULL_NUMBER`

#### Pass the appropriate [media type](https://docs.github.com/rest/using-the-rest-api/getting-started-with-the-rest-api#media-types) to fetch diff and patch formats.

- Example response
- Response schema

Status: 200

[Full JSON response schema available in original documentation]

---

## Update a pull request

Draft pull requests are available in public repositories with GitHub Free and GitHub Free for organizations, GitHub Pro, and legacy per-repository billing plans, and in public and private repositories with GitHub Team and GitHub Enterprise Cloud. For more information, see [GitHub's products](https://docs.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation.

To open or update a pull request in a public repository, you must have write access to the head or the source branch. For organization-owned repositories, you must be a member of the organization that owns the repository to open or update a pull request.

This endpoint supports the following custom media types. For more information, see "[Media types](https://docs.github.com/rest/using-the-rest-api/getting-started-with-the-rest-api#media-types)."

- **`application/vnd.github.raw+json`**: Returns the raw markdown body. Response will include `body`. This is the default if you do not pass any specific media type.
- **`application/vnd.github.text+json`**: Returns a text only representation of the markdown body. Response will include `body_text`.
- **`application/vnd.github.html+json`**: Returns HTML rendered from the body's markdown. Response will include `body_html`.
- **`application/vnd.github.full+json`**: Returns raw, text, and HTML representations. Response will include `body`, `body_text`, and `body_html`.

### Fine-grained access tokens for "Update a pull request"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Pull requests" repository permissions (write)

### Parameters for "Update a pull request"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `owner`stringRequired<br>The account owner of the repository. The name is not case sensitive. |
| `repo`stringRequired<br>The name of the repository without the `.git` extension. The name is not case sensitive. |
| `pull_number`integerRequired<br>The number that identifies the pull request. |

Path parameters

| Name, Type, Description |
| --- |
| `title`string<br>The title of the pull request. |
| `body`string<br>The contents of the pull request. |
| `state`string<br>State of this Pull Request. Either `open` or `closed`.<br>Can be one of:`open`,`closed` |
| `base`string<br>The name of the branch you want your changes pulled into. This should be an existing branch on the current repository. You cannot update the base branch on a pull request to point to another repository. |
| `maintainer_can_modify`boolean<br>Indicates whether [maintainers can modify](https://docs.github.com/articles/allowing-changes-to-a-pull-request-branch-created-from-a-fork/) the pull request. |

Body parameters

### HTTP response status codes for "Update a pull request"

| Status code | Description |
| --- | --- |
| `200` | OK |
| `403` | Forbidden |
| `422` | Validation failed, or the endpoint has been spammed. |

### Code samples for "Update a pull request"

#### Request example

patch/repos/{owner}/{repo}/pulls/{pull_number}

- cURL
- JavaScript
- GitHub CLI

Copy to clipboard curl request example

`curl -L \
  -X PATCH \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/repos/OWNER/REPO/pulls/PULL_NUMBER \
  -d '{"title":"new title","body":"updated body","state":"open","base":"master"}'`

#### Response

- Example response
- Response schema

Status: 200

[Full JSON response schema available in original documentation]

---

## List commits on a pull request

Lists a maximum of 250 commits for a pull request. To receive a complete
commit list for pull requests with more than 250 commits, use the [List commits](https://docs.github.com/rest/commits/commits#list-commits)
endpoint.

This endpoint supports the following custom media types. For more information, see "[Media types](https://docs.github.com/rest/using-the-rest-api/getting-started-with-the-rest-api#media-types)."

- **`application/vnd.github.raw+json`**: Returns the raw markdown body. Response will include `body`. This is the default if you do not pass any specific media type.
- **`application/vnd.github.text+json`**: Returns a text only representation of the markdown body. Response will include `body_text`.
- **`application/vnd.github.html+json`**: Returns HTML rendered from the body's markdown. Response will include `body_html`.
- **`application/vnd.github.full+json`**: Returns raw, text, and HTML representations. Response will include `body`, `body_text`, and `body_html`.

### Fine-grained access tokens for "List commits on a pull request"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Pull requests" repository permissions (read)

This endpoint can be used without authentication or the aforementioned permissions if only public resources are requested.

### Parameters for "List commits on a pull request"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `owner`stringRequired<br>The account owner of the repository. The name is not case sensitive. |
| `repo`stringRequired<br>The name of the repository without the `.git` extension. The name is not case sensitive. |
| `pull_number`integerRequired<br>The number that identifies the pull request. |

Path parameters

| Name, Type, Description |
| --- |
| `per_page`integer<br>The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)."<br>Default: `30` |
| `page`integer<br>The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)."<br>Default: `1` |

Query parameters

### HTTP response status codes for "List commits on a pull request"

| Status code | Description |
| --- | --- |
| `200` | OK |

### Code samples for "List commits on a pull request"

#### Request example

get/repos/{owner}/{repo}/pulls/{pull_number}/commits

- cURL
- JavaScript
- GitHub CLI

Copy to clipboard curl request example

`curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/repos/OWNER/REPO/pulls/PULL_NUMBER/commits`

#### Response

- Example response
- Response schema

Status: 200

```json
[
  {
      "url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
      "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e",
      "node_id": "MDY6Q29tbWl0NmRjYjA5YjViNTc4NzVmMzM0ZjYxYWViZWQ2OTVlMmU0MTkzZGI1ZQ==",
      "html_url": "https://github.com/octocat/Hello-World/commit/6dcb09b5b57875f334f61aebed695e2e4193db5e",
      "comments_url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e/comments",
      "commit": {
        "url": "https://api.github.com/repos/octocat/Hello-World/git/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
        "author": {
          "name": "Monalisa Octocat",
          "email": "support@github.com",
          "date": "2011-04-14T16:00:49Z"
        },
        "committer": {
          "name": "Monalisa Octocat",
          "email": "support@github.com",
          "date": "2011-04-14T16:00:49Z"
        },
        "message": "Fix all the bugs",
        "tree": {
          "url": "https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e",
          "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
        },
        "comment_count": 0,
        "verification": {
          "verified": false,
          "reason": "unsigned",
          "signature": null,
          "payload": null,
          "verified_at": null
        }
      },
      "author": {
        "login": "octocat",
        "id": 1,
        "node_id": "MDQ6VXNlcjE=",
        "avatar_url": "https://github.com/images/error/octocat_happy.gif",
        "gravatar_id": "",
        "url": "https://api.github.com/users/octocat",
        "html_url": "https://github.com/octocat",
        "followers_url": "https://api.github.com/users/octocat/followers",
        "following_url": "https://api.github.com/users/octocat/following{/other_user}",
        "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
        "organizations_url": "https://api.github.com/users/octocat/orgs",
        "repos_url": "https://api.github.com/users/octocat/repos",
        "events_url": "https://api.github.com/users/octocat/events{/privacy}",
        "received_events_url": "https://api.github.com/users/octocat/received_events",
        "type": "User",
        "site_admin": false
      },
      "committer": {
        "login": "octocat",
        "id": 1,
        "node_id": "MDQ6VXNlcjE=",
        "avatar_url": "https://github.com/images/error/octocat_happy.gif",
        "gravatar_id": "",
        "url": "https://api.github.com/users/octocat",
        "html_url": "https://github.com/octocat",
        "followers_url": "https://api.github.com/users/octocat/followers",
        "following_url": "https://api.github.com/users/octocat/following{/other_user}",
        "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
        "organizations_url": "https://api.github.com/users/octocat/orgs",
        "repos_url": "https://api.github.com/users/octocat/repos",
        "events_url": "https://api.github.com/users/octocat/events{/privacy}",
        "received_events_url": "https://api.github.com/users/octocat/received_events",
        "type": "User",
        "site_admin": false
      },
      "parents": [
        {
          "url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
          "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
        }
      ]
  }
]
```

---

## List pull requests files

Lists the files in a specified pull request.

**Note**

Responses include a maximum of 3000 files. The paginated response returns 30 files per page by default.

This endpoint supports the following custom media types. For more information, see "[Media types](https://docs.github.com/rest/using-the-rest-api/getting-started-with-the-rest-api#media-types)."

- **`application/vnd.github.raw+json`**: Returns the raw markdown body. Response will include `body`. This is the default if you do not pass any specific media type.
- **`application/vnd.github.text+json`**: Returns a text only representation of the markdown body. Response will include `body_text`.
- **`application/vnd.github.html+json`**: Returns HTML rendered from the body's markdown. Response will include `body_html`.
- **`application/vnd.github.full+json`**: Returns raw, text, and HTML representations. Response will include `body`, `body_text`, and `body_html`.

### Fine-grained access tokens for "List pull requests files"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Pull requests" repository permissions (read)

This endpoint can be used without authentication or the aforementioned permissions if only public resources are requested.

### Parameters for "List pull requests files"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `owner`stringRequired<br>The account owner of the repository. The name is not case sensitive. |
| `repo`stringRequired<br>The name of the repository without the `.git` extension. The name is not case sensitive. |
| `pull_number`integerRequired<br>The number that identifies the pull request. |

Path parameters

| Name, Type, Description |
| --- |
| `per_page`integer<br>The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)."<br>Default: `30` |
| `page`integer<br>The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)."<br>Default: `1` |

Query parameters

### HTTP response status codes for "List pull requests files"

| Status code | Description |
| --- | --- |
| `200` | OK |
| `422` | Validation failed, or the endpoint has been spammed. |
| `500` | Internal Error |
| `503` | Service unavailable |

### Code samples for "List pull requests files"

#### Request example

get/repos/{owner}/{repo}/pulls/{pull_number}/files

- cURL
- JavaScript
- GitHub CLI

Copy to clipboard curl request example

`curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/repos/OWNER/REPO/pulls/PULL_NUMBER/files`

#### Response

- Example response
- Response schema

Status: 200

```json
[
  {
      "sha": "bbcd538c8e72b8c175046e27cc8f907076331401",
      "filename": "file1.txt",
      "status": "added",
      "additions": 103,
      "deletions": 21,
      "changes": 124,
      "blob_url": "https://github.com/octocat/Hello-World/blob/6dcb09b5b57875f334f61aebed695e2e4193db5e/file1.txt",
      "raw_url": "https://github.com/octocat/Hello-World/raw/6dcb09b5b57875f334f61aebed695e2e4193db5e/file1.txt",
      "contents_url": "https://api.github.com/repos/octocat/Hello-World/contents/file1.txt?ref=6dcb09b5b57875f334f61aebed695e2e4193db5e",
      "patch": "@@ -132,7 +132,7 @@ module Test @@ -1000,7 +1000,7 @@ module Test"
  }
]
```

---

## Check if a pull request has been merged

Checks if a pull request has been merged into the base branch. The HTTP status of the response indicates whether or not the pull request has been merged; the response body is empty.

### Fine-grained access tokens for "Check if a pull request has been merged"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Pull requests" repository permissions (read)

This endpoint can be used without authentication or the aforementioned permissions if only public resources are requested.

### Parameters for "Check if a pull request has been merged"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `owner`stringRequired<br>The account owner of the repository. The name is not case sensitive. |
| `repo`stringRequired<br>The name of the repository without the `.git` extension. The name is not case sensitive. |
| `pull_number`integerRequired<br>The number that identifies the pull request. |

Path parameters

### HTTP response status codes for "Check if a pull request has been merged"

| Status code | Description |
| --- | --- |
| `204` | Response if pull request has been merged |
| `404` | Not Found if pull request has not been merged |

### Code samples for "Check if a pull request has been merged"

#### Request example

get/repos/{owner}/{repo}/pulls/{pull_number}/merge

- cURL
- JavaScript
- GitHub CLI

Copy to clipboard curl request example

`curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/repos/OWNER/REPO/pulls/PULL_NUMBER/merge`

#### Response if pull request has been merged

Status: 204

---

## Merge a pull request

Merges a pull request into the base branch.
This endpoint triggers [notifications](https://docs.github.com/github/managing-subscriptions-and-notifications-on-github/about-notifications). Creating content too quickly using this endpoint may result in secondary rate limiting. For more information, see "[Rate limits for the API](https://docs.github.com/rest/using-the-rest-api/rate-limits-for-the-rest-api#about-secondary-rate-limits)" and "[Best practices for using the REST API](https://docs.github.com/rest/guides/best-practices-for-using-the-rest-api)."

### Fine-grained access tokens for "Merge a pull request"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Contents" repository permissions (write)

### Parameters for "Merge a pull request"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `owner`stringRequired<br>The account owner of the repository. The name is not case sensitive. |
| `repo`stringRequired<br>The name of the repository without the `.git` extension. The name is not case sensitive. |
| `pull_number`integerRequired<br>The number that identifies the pull request. |

Path parameters

| Name, Type, Description |
| --- |
| `commit_title`string<br>Title for the automatic commit message. |
| `commit_message`string<br>Extra detail to append to automatic commit message. |
| `sha`string<br>SHA that pull request head must match to allow merge. |
| `merge_method`string<br>The merge method to use.<br>Can be one of:`merge`,`squash`,`rebase` |

Body parameters

### HTTP response status codes for "Merge a pull request"

| Status code | Description |
| --- | --- |
| `200` | if merge was successful |
| `403` | Forbidden |
| `404` | Resource not found |
| `405` | Method Not Allowed if merge cannot be performed |
| `409` | Conflict if sha was provided and pull request head did not match |
| `422` | Validation failed, or the endpoint has been spammed. |

### Code samples for "Merge a pull request"

#### Request example

put/repos/{owner}/{repo}/pulls/{pull_number}/merge

- cURL
- JavaScript
- GitHub CLI

Copy to clipboard curl request example

`curl -L \
  -X PUT \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/repos/OWNER/REPO/pulls/PULL_NUMBER/merge \
  -d '{"commit_title":"Expand enum","commit_message":"Add a new value to the merge_method enum"}'`

#### if merge was successful

- Example response
- Response schema

Status: 200

```json
{
"sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e",
"merged": true,
"message": "Pull Request successfully merged"
}
```

---

## Update a pull request branch

Updates the pull request branch with the latest upstream changes by merging HEAD from the base branch into the pull request branch.
Note: If making a request on behalf of a GitHub App you must also have permissions to write the contents of the head repository.

### Fine-grained access tokens for "Update a pull request branch"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Pull requests" repository permissions (write)

### Parameters for "Update a pull request branch"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `owner`stringRequired<br>The account owner of the repository. The name is not case sensitive. |
| `repo`stringRequired<br>The name of the repository without the `.git` extension. The name is not case sensitive. |
| `pull_number`integerRequired<br>The number that identifies the pull request. |

Path parameters

| Name, Type, Description |
| --- |
| `expected_head_sha`string<br>The expected SHA of the pull request's HEAD ref. This is the most recent commit on the pull request's branch. If the expected SHA does not match the pull request's HEAD, you will receive a `422 Unprocessable Entity` status. You can use the "[List commits](https://docs.github.com/rest/commits/commits#list-commits)" endpoint to find the most recent commit SHA. Default: SHA of the pull request's current HEAD ref. |

Body parameters

### HTTP response status codes for "Update a pull request branch"

| Status code | Description |
| --- | --- |
| `202` | Accepted |
| `403` | Forbidden |
| `422` | Validation failed, or the endpoint has been spammed. |

### Code samples for "Update a pull request branch"

#### Request example

put/repos/{owner}/{repo}/pulls/{pull_number}/update-branch

- cURL
- JavaScript
- GitHub CLI

Copy to clipboard curl request example

`curl -L \
  -X PUT \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/repos/OWNER/REPO/pulls/PULL_NUMBER/update-branch \
  -d '{"expected_head_sha":"6dcb09b5b57875f334f61aebed695e2e4193db5e"}'`

#### Response

- Example response
- Response schema

Status: 202

```json
{
"message": "Updating pull request branch.",
"url": "https://github.com/repos/octocat/Hello-World/pulls/53"
}
