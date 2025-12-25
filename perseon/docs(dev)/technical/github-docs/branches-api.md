# GitHub REST API Endpoints for Branches

The REST API is now versioned. For more information, see "[About API versioning](https://docs.github.com/rest/overview/api-versions)."

## Use the REST API to modify branches and their protection settings.

---

## List branches

### Fine-grained access tokens for "List branches"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Contents" repository permissions (read)

This endpoint can be used without authentication or the aforementioned permissions if only public resources are requested.

### Parameters for "List branches"

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
| `protected`boolean<br>Setting to `true` returns only branches protected by branch protections or rulesets. When set to `false`, only unprotected branches are returned. Omitting this parameter returns all branches. |
| `per_page`integer<br>The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)."<br>Default: `30` |
| `page`integer<br>The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)."<br>Default: `1` |

Query parameters

### HTTP response status codes for "List branches"

| Status code | Description |
| --- | --- |
| `200` | OK |
| `404` | Resource not found |

### Code samples for "List branches"

#### Request example

get/repos/{owner}/{repo}/branches

- cURL
- JavaScript
- GitHub CLI

Copy to clipboard curl request example

`curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/repos/OWNER/REPO/branches`

#### Response

- Example response
- Response schema

Status: 200

```json
[
  {
      "name": "master",
      "commit": {
        "sha": "c5b97d5ae6c19d5c5df71a34c7fbeeda2479ccbc",
        "url": "https://api.github.com/repos/octocat/Hello-World/commits/c5b97d5ae6c19d5c5df71a34c7fbeeda2479ccbc"
      },
      "protected": true,
      "protection": {
        "required_status_checks": {
          "enforcement_level": "non_admins",
          "contexts": [
            "ci-test",
            "linter"
          ]
        }
      },
      "protection_url": "https://api.github.com/repos/octocat/hello-world/branches/master/protection"
  }
]
```

---

## Get a branch

### Fine-grained access tokens for "Get a branch"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Contents" repository permissions (read)

This endpoint can be used without authentication or the aforementioned permissions if only public resources are requested.

### Parameters for "Get a branch"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `owner`stringRequired<br>The account owner of the repository. The name is not case sensitive. |
| `repo`stringRequired<br>The name of the repository without the `.git` extension. The name is not case sensitive. |
| `branch`stringRequired<br>The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). |

Path parameters

### HTTP response status codes for "Get a branch"

| Status code | Description |
| --- | --- |
| `200` | OK |
| `301` | Moved permanently |
| `404` | Resource not found |

### Code samples for "Get a branch"

#### Request example

get/repos/{owner}/{repo}/branches/{branch}

- cURL
- JavaScript
- GitHub CLI

Copy to clipboard curl request example

`curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/repos/OWNER/REPO/branches/BRANCH`

#### Response

- Example response
- Response schema

Status: 200

```json
{
"name": "main",
"commit": {
    "sha": "7fd1a60b01f91b314f59955a4e4d4e80d8edf11d",
    "node_id": "MDY6Q29tbWl0MTI5NjI6OjdmZDFhNjBiMDFmOTFiMzE0ZjU5OTU1YTRlNGQ0ZTgwZDhlZGYxMWQ=",
    "commit": {
      "author": {
        "name": "The Octocat",
        "email": "octocat@nowhere.com",
        "date": "2012-03-06T23:06:50Z"
      },
      "committer": {
        "name": "The Octocat",
        "email": "octocat@nowhere.com",
        "date": "2012-03-06T23:06:50Z"
      },
      "message": "Merge pull request #6 from Spaceghost/patch-1\n\nNew line at end of file.",
      "tree": {
        "sha": "b4eecafa9be2f2006ce1b709d6857b07069b4608",
        "url": "https://api.github.com/repos/octocat/Hello-World/git/trees/b4eecafa9be2f2006ce1b709d6857b07069b4608"
      },
      "url": "https://api.github.com/repos/octocat/Hello-World/git/commits/7fd1a60b01f91b314f59955a4e4d4e80d8edf11d",
      "comment_count": 77,
      "verification": {
        "verified": false,
        "reason": "unsigned",
        "signature": null,
        "payload": null,
        "verified_at": null
      }
    },
    "url": "https://api.github.com/repos/octocat/Hello-World/commits/7fd1a60b01f91b314f59955a4e4d4e80d8edf11d",
    "html_url": "https://github.com/octocat/Hello-World/commit/7fd1a60b01f91b314f59955a4e4d4e80d8edf11d",
    "comments_url": "https://api.github.com/repos/octocat/Hello-World/commits/7fd1a60b01f91b314f59955a4e4d4e80d8edf11d/comments",
    "author": {
      "login": "octocat",
      "id": 583231,
      "node_id": "MDQ6VXNlcjU4MzIzMQ==",
      "avatar_url": "https://avatars.githubusercontent.com/u/583231?v=4",
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
      "id": 583231,
      "node_id": "MDQ6VXNlcjU4MzIzMQ==",
      "avatar_url": "https://avatars.githubusercontent.com/u/583231?v=4",
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
        "sha": "553c2077f0edc3d5dc5d17262f6aa498e69d6f8e",
        "url": "https://api.github.com/repos/octocat/Hello-World/commits/553c2077f0edc3d5dc5d17262f6aa498e69d6f8e",
        "html_url": "https://github.com/octocat/Hello-World/commit/553c2077f0edc3d5dc5d17262f6aa498e69d6f8e"
      },
      {
        "sha": "762941318ee16e59dabbacb1b4049eec22f0d303",
        "url": "https://api.github.com/repos/octocat/Hello-World/commits/762941318ee16e59dabbacb1b4049eec22f0d303",
        "html_url": "https://github.com/octocat/Hello-World/commit/762941318ee16e59dabbacb1b4049eec22f0d303"
      }
    ]
},
"_links": {
    "self": "https://api.github.com/repos/octocat/Hello-World/branches/main",
    "html": "https://github.com/octocat/Hello-World/tree/main"
},
"protected": false,
"protection": {
    "enabled": false,
    "required_status_checks": {
      "enforcement_level": "off",
      "contexts": [],
      "checks": []
    }
},
"protection_url": "https://api.github.com/repos/octocat/Hello-World/branches/main/protection"
}
```

---

## Rename a branch

Renames a branch in a repository.

**Note**

Although the API responds immediately, the branch rename process might take some extra time to complete in the background. You won't be able to push to the old branch name while the rename process is in progress. For more information, see "[Renaming a branch](https://docs.github.com/github/administering-a-repository/renaming-a-branch)".

The authenticated user must have push access to the branch. If the branch is the default branch, the authenticated user must also have admin or owner permissions.

In order to rename the default branch, fine-grained access tokens also need the `administration:write` repository permission.

### Fine-grained access tokens for "Rename a branch"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Contents" repository permissions (write)

### Parameters for "Rename a branch"

| Name, Type, Description |
| --- |
| `accept`string<br>Setting to `application/vnd.github+json` is recommended. |

Headers

| Name, Type, Description |
| --- |
| `owner`stringRequired<br>The account owner of the repository. The name is not case sensitive. |
| `repo`stringRequired<br>The name of the repository without the `.git` extension. The name is not case sensitive. |
| `branch`stringRequired<br>The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql). |

Path parameters

| Name, Type, Description |
| --- |
| `new_name`stringRequired<br>The new name of the branch. |

Body parameters

### HTTP response status codes for "Rename a branch"

| Status code | Description |
| --- | --- |
| `201` | Created |
| `403` | Forbidden |
| `404` | Resource not found |
| `422` | Validation failed, or the endpoint has been spammed. |

### Code samples for "Rename a branch"

#### Request example

post/repos/{owner}/{repo}/branches/{branch}/rename

- cURL
- JavaScript
- GitHub CLI

Copy to clipboard curl request example

`curl -L \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/repos/OWNER/REPO/branches/BRANCH/rename \
  -d '{"new_name":"my_renamed_branch"}'`

#### Response

- Example response
- Response schema

Status: 201

[Full JSON response schema available in original documentation]

---

## Sync a fork branch with the upstream repository

Sync a branch of a forked repository to keep it up-to-date with the upstream repository.

### Fine-grained access tokens for "Sync a fork branch with the upstream repository"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Contents" repository permissions (write)

### Parameters for "Sync a fork branch with the upstream repository"

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
| `branch`stringRequired<br>The name of the branch which should be updated to match upstream. |

Body parameters

### HTTP response status codes for "Sync a fork branch with the upstream repository"

| Status code | Description |
| --- | --- |
| `200` | The branch has been successfully synced with the upstream repository |
| `409` | The branch could not be synced because of a merge conflict |
| `422` | The branch could not be synced for some other reason |

### Code samples for "Sync a fork branch with the upstream repository"

#### Request example

post/repos/{owner}/{repo}/merge-upstream

- cURL
- JavaScript
- GitHub CLI

Copy to clipboard curl request example

`curl -L \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/repos/OWNER/REPO/merge-upstream \
  -d '{"branch":"main"}'`

#### The branch has been successfully synced with the upstream repository

- Example response
- Response schema

Status: 200

```json
{
"message": "Successfully fetched and fast-forwarded from upstream defunkt:main",
"merge_type": "fast-forward",
"base_branch": "defunkt:main"
}
```

---

## Merge a branch

### Fine-grained access tokens for "Merge a branch"

This endpoint works with the following fine-grained token types:

- [GitHub App user access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

The fine-grained token must have the following permission set:

- "Contents" repository permissions (write)

### Parameters for "Merge a branch"

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
| `base`stringRequired<br>The name of the base branch that the head will be merged into. |
| `head`stringRequired<br>The head to merge. This can be a branch name or a commit SHA1. |
| `commit_message`string<br>Commit message to use for the merge commit. If omitted, a default message will be used. |

Body parameters

### HTTP response status codes for "Merge a branch"

| Status code | Description |
| --- | --- |
| `201` | Successful Response (The resulting merge commit) |
| `204` | Response when already merged |
| `403` | Forbidden |
| `404` | Not Found when the base or head does not exist |
| `409` | Conflict when there is a merge conflict |
| `422` | Validation failed, or the endpoint has been spammed. |

### Code samples for "Merge a branch"

#### Request example

post/repos/{owner}/{repo}/merges

- cURL
- JavaScript
- GitHub CLI

Copy to clipboard curl request example

`curl -L \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
https://api.github.com/repos/OWNER/REPO/merges \
  -d '{"base":"master","head":"cool_feature","commit_message":"Shipped cool_feature!"}'`

#### Successful Response (The resulting merge commit)

- Example response
- Response schema

Status: 201

[Full JSON response schema available in original documentation]
