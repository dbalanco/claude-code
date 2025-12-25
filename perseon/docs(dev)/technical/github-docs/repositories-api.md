# GitHub REST API Endpoints for Repositories

The REST API is now versioned. For more information, see "[About API versioning](https://docs.github.com/rest/overview/api-versions)."

## Use the REST API to manage repositories on GitHub.

---

## List organization repositories

Lists repositories for the specified organization.

**Note**

In order to see the `security_and_analysis` block for a repository you must have admin permissions for the repository or be an owner or security manager for the organization that owns the repository. For more information, see "[Managing security managers in your organization](https://docs.github.com/organizations/managing-peoples-access-to-your-organization-with-roles/managing-security-managers-in-your-organization)."

### Fine-grained access tokens for "List organization repositories"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Metadata" repository permissions (read)

This endpoint can be used without authentication or the aforementioned permissions if only public resources are requested.

### Parameters for "List organization repositories"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `org`stringRequired<br>The organization name. The name is not case sensitive. |

Path parameters

| Name, Type, Description |
| --- |
| `type`string<br>Specifies the types of repositories you want returned.<br>Default: `all`<br>Can be one of:`all`,`public`,`private`,`forks`,`sources`,`member` |
| `sort`string<br>The property to sort the results by.<br>Default: `created`<br>Can be one of:`created`,`updated`,`pushed`,`full_name` |
| `direction`string<br>The order to sort by. Default: `asc` when using `full_name`, otherwise `desc`.<br>Can be one of:`asc`,`desc` |
| `per_page`integer<br>The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)."<br>Default: `30` |
| `page`integer<br>The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)."<br>Default: `1` |

Query parameters

### HTTP response status codes for "List organization repositories"

| Status code | Description |
| --- | --- |
| `200` | OK |

### Code samples for "List organization repositories"

#### Request example

get/orgs/{org}/repos

- cURL
- JavaScript
- GitHub CLI

Copy to clipboard curl request example

`curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/orgs/ORG/repos`

#### Response

- Example response
- Response schema

Status: 200

```json
[
  {
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
      "stargazers_url": "https://api.github.com/repos/octocat/Hello-World/stargazers",
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
      "is_template": false,
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
      "security_and_analysis": {
        "advanced_security": {
          "status": "enabled"
        },
        "secret_scanning": {
          "status": "enabled"
        },
        "secret_scanning_push_protection": {
          "status": "disabled"
        },
        "secret_scanning_non_provider_patterns": {
          "status": "disabled"
        }
      }
  }
]
```

---

## Create an organization repository

Creates a new repository in the specified organization. The authenticated user must be a member of the organization.

OAuth app tokens and personal access tokens (classic) need the `public_repo` or `repo` scope to create a public repository, and `repo` scope to create a private repository.

### Fine-grained access tokens for "Create an organization repository"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Administration" repository permissions (write)

### Parameters for "Create an organization repository"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `org`stringRequired<br>The organization name. The name is not case sensitive. |

Path parameters

| Name, Type, Description |
| --- |
| `name`stringRequired<br>The name of the repository. |
| `description`string<br>A short description of the repository. |
| `homepage`string<br>A URL with more information about the repository. |
| `private`boolean<br>Whether the repository is private.<br>Default: `false` |
| `visibility`string<br>The visibility of the repository.<br>Can be one of:`public`,`private` |
| `has_issues`boolean<br>Either `true` to enable issues for this repository or `false` to disable them.<br>Default: `true` |
| `has_projects`boolean<br>Either `true` to enable projects for this repository or `false` to disable them. **Note:** If you're creating a repository in an organization that has disabled repository projects, the default is `false`, and if you pass `true`, the API returns an error.<br>Default: `true` |
| `has_wiki`boolean<br>Either `true` to enable the wiki for this repository or `false` to disable it.<br>Default: `true` |
| `has_downloads`boolean<br>Whether downloads are enabled.<br>Default: `true` |
| `is_template`boolean<br>Either `true` to make this repo available as a template repository or `false` to prevent it.<br>Default: `false` |
| `team_id`integer<br>The id of the team that will be granted access to this repository. This is only valid when creating a repository in an organization. |
| `auto_init`boolean<br>Pass `true` to create an initial commit with empty README.<br>Default: `false` |
| `gitignore_template`string<br>Desired language or platform [.gitignore template](https://github.com/github/gitignore) to apply. Use the name of the template without the extension. For example, "Haskell". |
| `license_template`string<br>Choose an [open source license template](https://choosealicense.com/) that best suits your needs, and then use the [license keyword](https://docs.github.com/articles/licensing-a-repository/#searching-github-by-license-type) as the `license_template` string. For example, "mit" or "mpl-2.0". |
| `allow_squash_merge`boolean<br>Either `true` to allow squash-merging pull requests, or `false` to prevent squash-merging.<br>Default: `true` |
| `allow_merge_commit`boolean<br>Either `true` to allow merging pull requests with a merge commit, or `false` to prevent merging pull requests with merge commits.<br>Default: `true` |
| `allow_rebase_merge`boolean<br>Either `true` to allow rebase-merging pull requests, or `false` to prevent rebase-merging.<br>Default: `true` |
| `allow_auto_merge`boolean<br>Either `true` to allow auto-merge on pull requests, or `false` to disallow auto-merge.<br>Default: `false` |
| `delete_branch_on_merge`boolean<br>Either `true` to allow automatically deleting head branches when pull requests are merged, or `false` to prevent automatic deletion. **The authenticated user must be an organization owner to set this property to `true`.**<br>Default: `false` |
| `use_squash_pr_title_as_default`boolean<br>Either `true` to allow squash-merge commits to use pull request title, or `false` to use commit message. **This property is closing down. Please use `squash_merge_commit_title` instead.<br>Default: `false` |
| `squash_merge_commit_title`string<br>Required when using `squash_merge_commit_message`.<br>The default value for a squash merge commit title:<br>- `PR_TITLE` - default to the pull request's title.<br>- `COMMIT_OR_PR_TITLE` - default to the commit's title (if only one commit) or the pull request's title (when more than one commit).<br>Can be one of:`PR_TITLE`,`COMMIT_OR_PR_TITLE` |
| `squash_merge_commit_message`string<br>The default value for a squash merge commit message:<br>- `PR_BODY` - default to the pull request's body.<br>- `COMMIT_MESSAGES` - default to the branch's commit messages.<br>- `BLANK` - default to a blank commit message.<br>Can be one of:`PR_BODY`,`COMMIT_MESSAGES`,`BLANK` |
| `merge_commit_title`string<br>Required when using `merge_commit_message`.<br>The default value for a merge commit title.<br>- `PR_TITLE` - default to the pull request's title.<br>- `MERGE_MESSAGE` - default to the classic title for a merge message (e.g., Merge pull request #123 from branch-name).<br>Can be one of:`PR_TITLE`,`MERGE_MESSAGE` |
| `merge_commit_message`string<br>The default value for a merge commit message.<br>- `PR_TITLE` - default to the pull request's title.<br>- `PR_BODY` - default to the pull request's body.<br>- `BLANK` - default to a blank commit message.<br>Can be one of:`PR_BODY`,`PR_TITLE`,`BLANK` |
| `custom_properties`object<br>The custom properties for the new repository. The keys are the custom property names, and the values are the corresponding custom property values. |

Body parameters

### HTTP response status codes for "Create an organization repository"

| Status code | Description |
| --- | --- |
| `201` | Created |
| `403` | Forbidden |
| `422` | Validation failed, or the endpoint has been spammed. |

### Code samples and full response details are available in the original documentation but have been truncated for brevity in this summary. The complete documentation provides detailed examples for cURL, JavaScript, and GitHub CLI implementations.

---

## Get a repository

The `parent` and `source` objects are present when the repository is a fork. `parent` is the repository this repository was forked from, `source` is the ultimate source for the network.

**Note:**

- In order to see the `security_and_analysis` block for a repository you must have admin permissions for the repository or be an owner or security manager for the organization that owns the repository. For more information, see "[Managing security managers in your organization](https://docs.github.com/organizations/managing-peoples-access-to-your-organization-with-roles/managing-security-managers-in-your-organization)."
- To view merge-related settings, you must have the `contents:read` and `contents:write` permissions.

### Fine-grained access tokens for "Get a repository"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Metadata" repository permissions (read)

This endpoint can be used without authentication or the aforementioned permissions if only public resources are requested.

### Parameters for "Get a repository"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `owner`stringRequired<br>The account owner of the repository. The name is not case sensitive. |
| `repo`stringRequired<br>The name of the repository without the `.git` extension. The name is not case sensitive. |

Path parameters

### HTTP response status codes for "Get a repository"

| Status code | Description |
| --- | --- |
| `200` | OK |
| `301` | Moved permanently |
| `403` | Forbidden |
| `404` | Resource not found |

### Code samples for "Get a repository"

#### Request example

get/repos/{owner}/{repo}

- cURL
- JavaScript
- GitHub CLI

Copy to clipboard curl request example

`curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/repos/OWNER/REPO`

#### Default response

- Example response
- Response schema

Status: 200

[Full JSON response schema available in original documentation]

---

## Update a repository

**Note**: To edit a repository's topics, use the [Replace all repository topics](https://docs.github.com/rest/repos/repos#replace-all-repository-topics) endpoint.

### Fine-grained access tokens for "Update a repository"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Administration" repository permissions (write)

### Parameters for "Update a repository"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `owner`stringRequired<br>The account owner of the repository. The name is not case sensitive. |
| `repo`stringRequired<br>The name of the repository without the `.git` extension. The name is not case sensitive. |

Path parameters

[Complete parameter list available in original documentation]

### HTTP response status codes for "Update a repository"

| Status code | Description |
| --- | --- |
| `200` | OK |
| `307` | Temporary Redirect |
| `403` | Forbidden |
| `404` | Resource not found |
| `422` | Validation failed, or the endpoint has been spammed. |

---

## Delete a repository

Deleting a repository requires admin access.

If an organization owner has configured the organization to prevent members from deleting organization-owned repositories, you will get a `403 Forbidden` response.

OAuth app tokens and personal access tokens (classic) need the `delete_repo` scope to use this endpoint.

### Fine-grained access tokens for "Delete a repository"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Administration" repository permissions (write)

### Parameters for "Delete a repository"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `owner`stringRequired<br>The account owner of the repository. The name is not case sensitive. |
| `repo`stringRequired<br>The name of the repository without the `.git` extension. The name is not case sensitive. |

Path parameters

### HTTP response status codes for "Delete a repository"

| Status code | Description |
| --- | --- |
| `204` | No Content |
| `307` | Temporary Redirect |
| `403` | If an organization owner has configured the organization to prevent members from deleting organization-owned repositories, a member will get this response: |
| `404` | Resource not found |
| `409` | Conflict |

---

## List repository activities

Lists a detailed history of changes to a repository, such as pushes, merges, force pushes, and branch changes, and associates these changes with commits and users.

For more information about viewing repository activity, see "[Viewing activity and data for your repository](https://docs.github.com/repositories/viewing-activity-and-data-for-your-repository)."

### Fine-grained access tokens for "List repository activities"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Contents" repository permissions (read)

This endpoint can be used without authentication or the aforementioned permissions if only public resources are requested.

### Parameters for "List repository activities"

[Complete parameter list available in original documentation]

---

## Check if Dependabot security updates are enabled for a repository

Shows whether Dependabot security updates are enabled, disabled or paused for a repository. The authenticated user must have admin read access to the repository. For more information, see "[Configuring Dependabot security updates](https://docs.github.com/articles/configuring-automated-security-fixes)".

### Fine-grained access tokens for "Check if Dependabot security updates are enabled for a repository"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Administration" repository permissions (read)

### Parameters for "Check if Dependabot security updates are enabled for a repository"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `owner`stringRequired<br>The account owner of the repository. The name is not case sensitive. |
| `repo`stringRequired<br>The name of the repository without the `.git` extension. The name is not case sensitive. |

Path parameters

### HTTP response status codes for "Check if Dependabot security updates are enabled for a repository"

| Status code | Description |
| --- | --- |
| `200` | Response if Dependabot is enabled |
| `404` | Not Found if Dependabot is not enabled for the repository |

### Code samples for "Check if Dependabot security updates are enabled for a repository"

#### Request example

get/repos/{owner}/{repo}/automated-security-fixes

- cURL
- JavaScript
- GitHub CLI

Copy to clipboard curl request example

`curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/repos/OWNER/REPO/automated-security-fixes`

#### Response if Dependabot is enabled

- Example response
- Response schema

Status: 200

```json
{
  "enabled": true,
  "paused": false
}
```

---

## Enable Dependabot security updates

Enables Dependabot security updates for a repository. The authenticated user must have admin access to the repository. For more information, see "[Configuring Dependabot security updates](https://docs.github.com/articles/configuring-automated-security-fixes)".

### Fine-grained access tokens for "Enable Dependabot security updates"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Administration" repository permissions (write)

### Parameters for "Enable Dependabot security updates"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `owner`stringRequired<br>The account owner of the repository. The name is not case sensitive. |
| `repo`stringRequired<br>The name of the repository without the `.git` extension. The name is not case sensitive. |

Path parameters

### HTTP response status codes for "Enable Dependabot security updates"

| Status code | Description |
| --- | --- |
| `204` | No Content |

---

## Disable Dependabot security updates

Disables Dependabot security updates for a repository. The authenticated user must have admin access to the repository. For more information, see "[Configuring Dependabot security updates](https://docs.github.com/articles/configuring-automated-security-fixes)".

### Fine-grained access tokens for "Disable Dependabot security updates"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Administration" repository permissions (write)

### Parameters for "Disable Dependabot security updates"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `owner`stringRequired<br>The account owner of the repository. The name is not case sensitive. |
| `repo`stringRequired<br>The name of the repository without the `.git` extension. The name is not case sensitive. |

Path parameters

### HTTP response status codes for "Disable Dependabot security updates"

| Status code | Description |
| --- | --- |
| `204` | No Content |

---

## List CODEOWNERS errors

List any syntax errors that are detected in the CODEOWNERS file.

For more information about the correct CODEOWNERS syntax, see "[About code owners](https://docs.github.com/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)."

### Fine-grained access tokens for "List CODEOWNERS errors"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Contents" repository permissions (read)

This endpoint can be used without authentication or the aforementioned permissions if only public resources are requested.

### Parameters for "List CODEOWNERS errors"

[Complete parameter list available in original documentation]

---

## List repository contributors

Lists contributors to the specified repository and sorts them by the number of commits per contributor in descending order. This endpoint may return information that is a few hours old because the GitHub REST API caches contributor data to improve performance.

GitHub identifies contributors by author email address. This endpoint groups contribution counts by GitHub user, which includes all associated email addresses. To improve performance, only the first 500 author email addresses in the repository link to GitHub users. The rest will appear as anonymous contributors without associated GitHub user information.

### Fine-grained access tokens for "List repository contributors"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Metadata" repository permissions (read)

This endpoint can be used without authentication or the aforementioned permissions if only public resources are requested.

### Parameters for "List repository contributors"

[Complete parameter list available in original documentation]

---

## Create a repository dispatch event

You can use this endpoint to trigger a webhook event called `repository_dispatch` when you want activity that happens outside of GitHub to trigger a GitHub Actions workflow or GitHub App webhook. You must configure your GitHub Actions workflow or GitHub App to run when the `repository_dispatch` event occurs. For an example `repository_dispatch` webhook payload, see "[RepositoryDispatchEvent](https://docs.github.com/webhooks/event-payloads/#repository_dispatch)."

The `client_payload` parameter is available for any extra information that your workflow might need. This parameter is a JSON payload that will be passed on when the webhook event is dispatched. For example, the `client_payload` can include a message that a user would like to send using a GitHub Actions workflow. Or the `client_payload` can be used as a test to debug your workflow.

This input example shows how you can use the `client_payload` as a test to debug your workflow.

OAuth app tokens and personal access tokens (classic) need the `repo` scope to use this endpoint.

### Fine-grained access tokens for "Create a repository dispatch event"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Contents" repository permissions (write)

### Parameters for "Create a repository dispatch event"

[Complete parameter list available in original documentation]

---

## Check if immutable releases are enabled for a repository

Shows whether immutable releases are enabled or disabled. Also identifies whether immutability is being enforced by the repository owner. The authenticated user must have admin read access to the repository.

### Fine-grained access tokens for "Check if immutable releases are enabled for a repository"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Administration" repository permissions (read)

### Parameters for "Check if immutable releases are enabled for a repository"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `owner`stringRequired<br>The account owner of the repository. The name is not case sensitive. |
| `repo`stringRequired<br>The name of the repository without the `.git` extension. The name is not case sensitive. |

Path parameters

### HTTP response status codes for "Check if immutable releases are enabled for a repository"

| Status code | Description |
| --- | --- |
| `200` | Response if immutable releases are enabled |
| `404` | Not Found if immutable releases are not enabled for the repository |

### Code samples for "Check if immutable releases are enabled for a repository"

#### Request example

get/repos/{owner}/{repo}/immutable-releases

- cURL
- JavaScript
- GitHub CLI

Copy to clipboard curl request example

`curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/repos/OWNER/REPO/immutable-releases`

#### Response if immutable releases are enabled

- Example response
- Response schema

Status: 200

```json
{
  "enabled": true,
  "enforced_by_owner": false
}
```

---

## Enable immutable releases

Enables immutable releases for a repository. The authenticated user must have admin access to the repository.

### Fine-grained access tokens for "Enable immutable releases"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Administration" repository permissions (write)

### Parameters for "Enable immutable releases"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `owner`stringRequired<br>The account owner of the repository. The name is not case sensitive. |
| `repo`stringRequired<br>The name of the repository without the `.git` extension. The name is not case sensitive. |

Path parameters

### HTTP response status codes for "Enable immutable releases"

| Status code | Description |
| --- | --- |
| `204` | A header with no content is returned. |
| `409` | Conflict |

---

## Disable immutable releases

Disables immutable releases for a repository. The authenticated user must have admin access to the repository.

### Fine-grained access tokens for "Disable immutable releases"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Administration" repository permissions (write)

### Parameters for "Disable immutable releases"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `owner`stringRequired<br>The account owner of the repository. The name is not case sensitive. |
| `repo`stringRequired<br>The name of the repository without the `.git` extension. The name is not case sensitive. |

Path parameters

### HTTP response status codes for "Disable immutable releases"

| Status code | Description |
| --- | --- |
| `204` | A header with no content is returned. |
| `409` | Conflict |

---

## List repository languages

Lists languages for the specified repository. The value shown for each language is the number of bytes of code written in that language.

### Fine-grained access tokens for "List repository languages"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Metadata" repository permissions (read)

This endpoint can be used without authentication or the aforementioned permissions if only public resources are requested.

### Parameters for "List repository languages"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `owner`stringRequired<br>The account owner of the repository. The name is not case sensitive. |
| `repo`stringRequired<br>The name of the repository without the `.git` extension. The name is not case sensitive. |

Path parameters

### HTTP response status codes for "List repository languages"

| Status code | Description |
| --- | --- |
| `200` | OK |

### Code samples for "List repository languages"

#### Request example

get/repos/{owner}/{repo}/languages

- cURL
- JavaScript
- GitHub CLI

Copy to clipboard curl request example

`curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/repos/OWNER/REPO/languages`

#### Response

- Example response
- Response schema

Status: 200

```json
{
  "C": 78769,
  "Python": 7769
}
```

---

## Check if private vulnerability reporting is enabled for a repository

Returns a boolean indicating whether or not private vulnerability reporting is enabled for the repository. For more information, see "[Evaluating the security settings of a repository](https://docs.github.com/code-security/security-advisories/working-with-repository-security-advisories/evaluating-the-security-settings-of-a-repository)".

### Fine-grained access tokens for "Check if private vulnerability reporting is enabled for a repository"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Metadata" repository permissions (read)

This endpoint can be used without authentication or the aforementioned permissions if only public resources are requested.

### Parameters for "Check if private vulnerability reporting is enabled for a repository"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `owner`stringRequired<br>The account owner of the repository. The name is not case sensitive. |
| `repo`stringRequired<br>The name of the repository without the `.git` extension. The name is not case sensitive. |

Path parameters

### HTTP response status codes for "Check if private vulnerability reporting is enabled for a repository"

| Status code | Description |
| --- | --- |
| `200` | Private vulnerability reporting status |
| `422` | Bad Request |

### Code samples for "Check if private vulnerability reporting is enabled for a repository"

#### Request example

get/repos/{owner}/{repo}/private-vulnerability-reporting

- cURL
- JavaScript
- GitHub CLI

Copy to clipboard curl request example

`curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/repos/OWNER/REPO/private-vulnerability-reporting`

#### Private vulnerability reporting status

- Example response
- Response schema

Status: 200

```json
{
  "enabled": true
}
```

---

## Enable private vulnerability reporting for a repository

Enables private vulnerability reporting for a repository. The authenticated user must have admin access to the repository. For more information, see "[Privately reporting a security vulnerability](https://docs.github.com/code-security/security-advisories/guidance-on-reporting-and-writing/privately-reporting-a-security-vulnerability)".

### Fine-grained access tokens for "Enable private vulnerability reporting for a repository"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Administration" repository permissions (write)

### Parameters for "Enable private vulnerability reporting for a repository"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `owner`stringRequired<br>The account owner of the repository. The name is not case sensitive. |
| `repo`stringRequired<br>The name of the repository without the `.git` extension. The name is not case sensitive. |

Path parameters

### HTTP response status codes for "Enable private vulnerability reporting for a repository"

| Status code | Description |
| --- | --- |
| `204` | A header with no content is returned. |
| `422` | Bad Request |

---

## Disable private vulnerability reporting for a repository

Disables private vulnerability reporting for a repository. The authenticated user must have admin access to the repository. For more information, see "[Privately reporting a security vulnerability](https://docs.github.com/code-security/security-advisories/guidance-on-reporting-and-writing/privately-reporting-a-security-vulnerability)".

### Fine-grained access tokens for "Disable private vulnerability reporting for a repository"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Administration" repository permissions (write)

### Parameters for "Disable private vulnerability reporting for a repository"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `owner`stringRequired<br>The account owner of the repository. The name is not case sensitive. |
| `repo`stringRequired<br>The name of the repository without the `.git` extension. The name is not case sensitive. |

Path parameters

### HTTP response status codes for "Disable private vulnerability reporting for a repository"

| Status code | Description |
| --- | --- |
| `204` | A header with no content is returned. |
| `422` | Bad Request |

---

## List repository tags

### Fine-grained access tokens for "List repository tags"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Metadata" repository permissions (read)

This endpoint can be used without authentication or the aforementioned permissions if only public resources are requested.

### Parameters for "List repository tags"

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
| `per_page`integer<br>The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)."<br>Default: `30` |
| `page`integer<br>The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)."<br>Default: `1` |

Query parameters

### HTTP response status codes for "List repository tags"

| Status code | Description |
| --- | --- |
| `200` | OK |

### Code samples for "List repository tags"

#### Request example

get/repos/{owner}/{repo}/tags

- cURL
- JavaScript
- GitHub CLI

Copy to clipboard curl request example

`curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/repos/OWNER/REPO/tags`

#### Response

- Example response
- Response schema

Status: 200

```json
[
  {
      "name": "v0.1",
      "commit": {
        "sha": "c5b97d5ae6c19d5c5df71a34c7fbeeda2479ccbc",
        "url": "https://api.github.com/repos/octocat/Hello-World/commits/c5b97d5ae6c19d5c5df71a34c7fbeeda2479ccbc"
      },
      "zipball_url": "https://github.com/octocat/Hello-World/zipball/v0.1",
      "tarball_url": "https://github.com/octocat/Hello-World/tarball/v0.1",
      "node_id": "MDQ6VXNlcjE="
  }
]
```

---

## List repository teams

Lists the teams that have access to the specified repository and that are also visible to the authenticated user.

For a public repository, a team is listed only if that team added the public repository explicitly.

OAuth app tokens and personal access tokens (classic) need the `public_repo` or `repo` scope to use this endpoint with a public repository, and `repo` scope to use this endpoint with a private repository.

### Fine-grained access tokens for "List repository teams"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Administration" repository permissions (read)

### Parameters for "List repository teams"

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
| `per_page`integer<br>The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)."<br>Default: `30` |
| `page`integer<br>The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)."<br>Default: `1` |

Query parameters

### HTTP response status codes for "List repository teams"

| Status code | Description |
| --- | --- |
| `200` | OK |
| `404` | Resource not found |

### Code samples for "List repository teams"

#### Request example

get/repos/{owner}/{repo}/teams

- cURL
- JavaScript
- GitHub CLI

Copy to clipboard curl request example

`curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/repos/OWNER/REPO/teams`

#### Response

- Example response
- Response schema

Status: 200

```json
[
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
]
```

---

## Get all repository topics

### Fine-grained access tokens for "Get all repository topics"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Metadata" repository permissions (read)

This endpoint can be used without authentication or the aforementioned permissions if only public resources are requested.

### Parameters for "Get all repository topics"

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
| `page`integer<br>The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)."<br>Default: `1` |
| `per_page`integer<br>The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)."<br>Default: `30` |

Query parameters

### HTTP response status codes for "Get all repository topics"

| Status code | Description |
| --- | --- |
| `200` | OK |
| `404` | Resource not found |

### Code samples for "Get all repository topics"

#### Request example

get/repos/{owner}/{repo}/topics

- cURL
- JavaScript
- GitHub CLI

Copy to clipboard curl request example

`curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/repos/OWNER/REPO/topics`

#### Response

- Example response
- Response schema

Status: 200

```json
{
  "names": [
      "octocat",
      "atom",
      "electron",
      "api"
  ]
}
```

---

## Replace all repository topics

### Fine-grained access tokens for "Replace all repository topics"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Administration" repository permissions (write)

### Parameters for "Replace all repository topics"

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
| `names`array of stringsRequired<br>An array of topics to add to the repository. Pass one or more topics to _replace_ the set of existing topics. Send an empty array (`[]`) to clear all topics from the repository. **Note:** Topic `names` will be saved as lowercase. |

Body parameters

### HTTP response status codes for "Replace all repository topics"

| Status code | Description |
| --- | --- |
| `200` | OK |
| `404` | Resource not found |
| `422` | Validation failed, or the endpoint has been spammed. |

### Code samples for "Replace all repository topics"

#### Request example

put/repos/{owner}/{repo}/topics

- cURL
- JavaScript
- GitHub CLI

Copy to clipboard curl request example

`curl -L \
  -X PUT \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/repos/OWNER/REPO/topics \
  -d '{"names":["octocat","atom","electron","api"]}'`

#### Response

- Example response
- Response schema

Status: 200

```json
{
  "names": [
      "octocat",
      "atom",
      "electron",
      "api"
  ]
}
```

---

## Transfer a repository

A transfer request will need to be accepted by the new owner when transferring a personal repository to another user. The response will contain the original `owner`, and the transfer will continue asynchronously. For more details on the requirements to transfer personal and organization-owned repositories, see [about repository transfers](https://docs.github.com/articles/about-repository-transfers/).

### Fine-grained access tokens for "Transfer a repository"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)

The fine-grained token must have the following permission set:

- "Administration" repository permissions (write)

### Parameters for "Transfer a repository"

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
| `new_owner`stringRequired<br>The username or organization name the repository will be transferred to. |
| `new_name`string<br>The new name to be given to the repository. |
| `team_ids`array of integers<br>ID of the team or teams to add to the repository. Teams can only be added to organization-owned repositories. |

Body parameters

### HTTP response status codes for "Transfer a repository"

| Status code | Description |
| --- | --- |
| `202` | Accepted |

### Code samples for "Transfer a repository"

#### Request example

post/repos/{owner}/{repo}/transfer

- cURL
- JavaScript
- GitHub CLI

Copy to clipboard curl request example

`curl -L \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/repos/OWNER/REPO/transfer \
  -d '{"new_owner":"github","team_ids":[12,345],"new_name":"octorepo"}'`

#### Response

- Example response
- Response schema

Status: 202

[Full JSON response schema available in original documentation]

---

## Check if vulnerability alerts are enabled for a repository

Shows whether dependency alerts are enabled or disabled for a repository. The authenticated user must have admin read access to the repository. For more information, see "[About security alerts for vulnerable dependencies](https://docs.github.com/articles/about-security-alerts-for-vulnerable-dependencies)".

### Fine-grained access tokens for "Check if vulnerability alerts are enabled for a repository"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Administration" repository permissions (read)

### Parameters for "Check if vulnerability alerts are enabled for a repository"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `owner`stringRequired<br>The account owner of the repository. The name is not case sensitive. |
| `repo`stringRequired<br>The name of the repository without the `.git` extension. The name is not case sensitive. |

Path parameters

### HTTP response status codes for "Check if vulnerability alerts are enabled for a repository"

| Status code | Description |
| --- | --- |
| `204` | Response if repository is enabled with vulnerability alerts |
| `404` | Not Found if repository is not enabled with vulnerability alerts |

### Code samples for "Check if vulnerability alerts are enabled for a repository"

#### Request example

get/repos/{owner}/{repo}/vulnerability-alerts

- cURL
- JavaScript
- GitHub CLI

Copy to clipboard curl request example

`curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/repos/OWNER/REPO/vulnerability-alerts`

#### Response if repository is enabled with vulnerability alerts

Status: 204

---

## Enable vulnerability alerts

Enables dependency alerts and the dependency graph for a repository. The authenticated user must have admin access to the repository. For more information, see "[About security alerts for vulnerable dependencies](https://docs.github.com/articles/about-security-alerts-for-vulnerable-dependencies)".

### Fine-grained access tokens for "Enable vulnerability alerts"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Administration" repository permissions (write)

### Parameters for "Enable vulnerability alerts"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `owner`stringRequired<br>The account owner of the repository. The name is not case sensitive. |
| `repo`stringRequired<br>The name of the repository without the `.git` extension. The name is not case sensitive. |

Path parameters

### HTTP response status codes for "Enable vulnerability alerts"

| Status code | Description |
| --- | --- |
| `204` | No Content |

---

## Disable vulnerability alerts

Disables dependency alerts and the dependency graph for a repository. The authenticated user must have admin access to the repository. For more information, see "[About security alerts for vulnerable dependencies](https://docs.github.com/articles/about-security-alerts-for-vulnerable-dependencies)".

### Fine-grained access tokens for "Disable vulnerability alerts"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Administration" repository permissions (write)

### Parameters for "Disable vulnerability alerts"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `owner`stringRequired<br>The account owner of the repository. The name is not case sensitive. |
| `repo`stringRequired<br>The name of the repository without the `.git` extension. The name is not case sensitive. |

Path parameters

### HTTP response status codes for "Disable vulnerability alerts"

| Status code | Description |
| --- | --- |
| `204` | No Content |

---

## Create a repository using a template

Creates a new repository using a repository template. Use the `template_owner` and `template_repo` route parameters to specify the repository to use as the template. If the repository is not public, the authenticated user must own or be a member of an organization that owns the repository. To check if a repository is available to use as a template, get the repository's information using the [Get a repository](https://docs.github.com/rest/repos/repos#get-a-repository) endpoint and check that the `is_template` key is `true`.

OAuth app tokens and personal access tokens (classic) need the `public_repo` or `repo` scope to create a public repository, and `repo` scope to create a private repository.

### Fine-grained access tokens for "Create a repository using a template"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Administration" repository permissions (write) and "Contents" repository permissions (read)

### Parameters for "Create a repository using a template"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `template_owner`stringRequired<br>The account owner of the template repository. The name is not case sensitive. |
| `template_repo`stringRequired<br>The name of the template repository without the `.git` extension. The name is not case sensitive. |

Path parameters

| Name, Type, Description |
| --- |
| `owner`string<br>The organization or person who will own the new repository. To create a new repository in an organization, the authenticated user must be a member of the specified organization. |
| `name`stringRequired<br>The name of the new repository. |
| `description`string<br>A short description of the new repository. |
| `include_all_branches`boolean<br>Set to `true` to include the directory structure and files from all branches in the template repository, and not just the default branch. Default: `false`.<br>Default: `false` |
| `private`boolean<br>Either `true` to create a new private repository or `false` to create a new public one.<br>Default: `false` |

Body parameters

### HTTP response status codes for "Create a repository using a template"

| Status code | Description |
| --- | --- |
| `201` | Created |

### Code samples for "Create a repository using a template"

#### Request example

post/repos/{template_owner}/{template_repo}/generate

- cURL
- JavaScript
- GitHub CLI

Copy to clipboard curl request example

`curl -L \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/repos/TEMPLATE_OWNER/TEMPLATE_REPO/generate \
  -d '{"owner":"octocat","name":"Hello-World","description":"This is your first repository","include_all_branches":false,"private":false}'`

#### Response

- Example response
- Response schema

Status: 201

[Full JSON response schema available in original documentation]

---

## List public repositories

Lists all public repositories in the order that they were created.

**Note:**

For GitHub Enterprise Server, this endpoint will only list repositories available to all users on the enterprise. Pagination is powered exclusively by the `since` parameter. Use the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers) to get the URL for the next page of repositories.

### Fine-grained access tokens for "List public repositories"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Metadata" repository permissions (read)

This endpoint can be used without authentication or the aforementioned permissions if only public resources are requested.

### Parameters for "List public repositories"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `since`integer<br>A repository ID. Only return repositories with an ID greater than this ID. |

Query parameters

### HTTP response status codes for "List public repositories"

| Status code | Description |
| --- | --- |
| `200` | OK |
| `304` | Not modified |
| `422` | Validation failed, or the endpoint has been spammed. |

### Code samples for "List public repositories"

#### Request example

get/repositories

- cURL
- JavaScript
- GitHub CLI

Copy to clipboard curl request example

`curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/repositories`

#### Response

- Example response
- Response schema

Status: 200

[Full JSON response schema available in original documentation]

---

## List repositories for the authenticated user

Lists repositories that the authenticated user has explicit permission (`:read`, `:write`, or `:admin`) to access.

The authenticated user has explicit permission to access repositories they own, repositories where they are a collaborator, and repositories that they can access through an organization membership.

### Fine-grained access tokens for "List repositories for the authenticated user"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Metadata" repository permissions (read)

This endpoint can be used without authentication or the aforementioned permissions if only public resources are requested.

### Parameters for "List repositories for the authenticated user"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `visibility`string<br>Limit results to repositories with the specified visibility.<br>Default: `all`<br>Can be one of:`all`,`public`,`private` |
| `affiliation`string<br>Comma-separated list of values. Can include:<br>- `owner`: Repositories that are owned by the authenticated user.<br>- `collaborator`: Repositories that the user has been added to as a collaborator.<br>- `organization_member`: Repositories that the user has access to through being a member of an organization. This includes every repository on every team that the user is on.<br>Default: `owner,collaborator,organization_member` |
| `type`string<br>Limit results to repositories of the specified type. Will cause a `422` error if used in the same request as **visibility** or **affiliation**.<br>Default: `all`<br>Can be one of:`all`,`owner`,`public`,`private`,`member` |
| `sort`string<br>The property to sort the results by.<br>Default: `full_name`<br>Can be one of:`created`,`updated`,`pushed`,`full_name` |
| `direction`string<br>The order to sort by. Default: `asc` when using `full_name`, otherwise `desc`.<br>Can be one of:`asc`,`desc` |
| `per_page`integer<br>The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)."<br>Default: `30` |
| `page`integer<br>The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)."<br>Default: `1` |
| `since`string<br>Only show repositories updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. |
| `before`string<br>Only show repositories updated before the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. |

Query parameters

### HTTP response status codes for "List repositories for the authenticated user"

| Status code | Description |
| --- | --- |
| `200` | OK |
| `304` | Not modified |
| `401` | Requires authentication |
| `403` | Forbidden |
| `422` | Validation failed, or the endpoint has been spammed. |

### Code samples for "List repositories for the authenticated user"

#### Request example

get/user/repos

- cURL
- JavaScript
- GitHub CLI

Copy to clipboard curl request example

`curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/user/repos`

#### Default response

- Example response
- Response schema

Status: 200

[Full JSON response schema available in original documentation]

---

## Create a repository for the authenticated user

Creates a new repository for the authenticated user.

OAuth app tokens and personal access tokens (classic) need the `public_repo` or `repo` scope to create a public repository, and `repo` scope to create a private repository.

### Fine-grained access tokens for "Create a repository for the authenticated user"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Administration" repository permissions (write)

### Parameters for "Create a repository for the authenticated user"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `name`stringRequired<br>The name of the repository. |
| `description`string<br>A short description of the repository. |
| `homepage`string<br>A URL with more information about the repository. |
| `private`boolean<br>Whether the repository is private.<br>Default: `false` |
| `has_issues`boolean<br>Whether issues are enabled.<br>Default: `true` |
| `has_projects`boolean<br>Whether projects are enabled.<br>Default: `true` |
| `has_wiki`boolean<br>Whether the wiki is enabled.<br>Default: `true` |
| `has_discussions`boolean<br>Whether discussions are enabled.<br>Default: `false` |
| `team_id`integer<br>The id of the team that will be granted access to this repository. This is only valid when creating a repository in an organization. |
| `auto_init`boolean<br>Whether the repository is initialized with a minimal README.<br>Default: `false` |
| `gitignore_template`string<br>The desired language or platform to apply to the .gitignore. |
| `license_template`string<br>The license keyword of the open source license for this repository. |
| `allow_squash_merge`boolean<br>Whether to allow squash merges for pull requests.<br>Default: `true` |
| `allow_merge_commit`boolean<br>Whether to allow merge commits for pull requests.<br>Default: `true` |
| `allow_rebase_merge`boolean<br>Whether to allow rebase merges for pull requests.<br>Default: `true` |
| `allow_auto_merge`boolean<br>Whether to allow Auto-merge to be used on pull requests.<br>Default: `false` |
| `delete_branch_on_merge`boolean<br>Whether to delete head branches when pull requests are merged<br>Default: `false` |
| `squash_merge_commit_title`string<br>Required when using `squash_merge_commit_message`.<br>The default value for a squash merge commit title:<br>- `PR_TITLE` - default to the pull request's title.<br>- `COMMIT_OR_PR_TITLE` - default to the commit's title (if only one commit) or the pull request's title (when more than one commit).<br>Can be one of:`PR_TITLE`,`COMMIT_OR_PR_TITLE` |
| `squash_merge_commit_message`string<br>The default value for a squash merge commit message:<br>- `PR_BODY` - default to the pull request's body.<br>- `COMMIT_MESSAGES` - default to the branch's commit messages.<br>- `BLANK` - default to a blank commit message.<br>Can be one of:`PR_BODY`,`COMMIT_MESSAGES`,`BLANK` |
| `merge_commit_title`string<br>Required when using `merge_commit_message`.<br>The default value for a merge commit title.<br>- `PR_TITLE` - default to the pull request's title.<br>- `MERGE_MESSAGE` - default to the classic title for a merge message (e.g., Merge pull request #123 from branch-name).<br>Can be one of:`PR_TITLE`,`MERGE_MESSAGE` |
| `merge_commit_message`string<br>The default value for a merge commit message.<br>- `PR_TITLE` - default to the pull request's title.<br>- `PR_BODY` - default to the pull request's body.<br>- `BLANK` - default to a blank commit message.<br>Can be one of:`PR_BODY`,`PR_TITLE`,`BLANK` |
| `has_downloads`boolean<br>Whether downloads are enabled.<br>Default: `true` |
| `is_template`boolean<br>Whether this repository acts as a template that can be used to generate new repositories.<br>Default: `false` |

Body parameters

### HTTP response status codes for "Create a repository for the authenticated user"

| Status code | Description |
| --- | --- |
| `201` | Created |
| `304` | Not modified |
| `400` | Bad Request |
| `401` | Requires authentication |
| `403` | Forbidden |
| `404` | Resource not found |
| `422` | Validation failed, or the endpoint has been spammed. |

### Code samples for "Create a repository for the authenticated user"

#### Request example

post/user/repos

- cURL
- JavaScript
- GitHub CLI

Copy to clipboard curl request example

`curl -L \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/user/repos \
  -d '{"name":"Hello-World","description":"This is your first repository","homepage":"https://github.com","private":false,"is_template":true}'`

#### Response

- Example response
- Response schema

Status: 201

[Full JSON response schema available in original documentation]

---

## List repositories for a user

Lists public repositories for the specified user.

### Fine-grained access tokens for "List repositories for a user"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Metadata" repository permissions (read)

This endpoint can be used without authentication or the aforementioned permissions if only public resources are requested.

### Parameters for "List repositories for a user"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `username`stringRequired<br>The handle for the GitHub user account. |

Path parameters

| Name, Type, Description |
| --- |
| `type`string<br>Limit results to repositories of the specified type.<br>Default: `owner`<br>Can be one of:`all`,`owner`,`member` |
| `sort`string<br>The property to sort the results by.<br>Default: `full_name`<br>Can be one of:`created`,`updated`,`pushed`,`full_name` |
| `direction`string<br>The order to sort by. Default: `asc` when using `full_name`, otherwise `desc`.<br>Can be one of:`asc`,`desc` |
| `per_page`integer<br>The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)."<br>Default: `30` |
| `page`integer<br>The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)."<br>Default: `1` |

Query parameters

### HTTP response status codes for "List repositories for a user"

| Status code | Description |
| --- | --- |
| `200` | OK |

### Code samples for "List repositories for a user"

#### Request example

get/users/{username}/repos

- cURL
- JavaScript
- GitHub CLI

Copy to clipboard curl request example

`curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/users/USERNAME/repos`

#### Response

- Example response
- Response schema

Status: 200

[Full JSON response schema available in original documentation]
