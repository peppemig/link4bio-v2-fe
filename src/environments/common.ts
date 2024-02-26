export function commonConfig(servers: any) {
  return {
    services: {
      auth: {
        url: servers.apiUrl,
        collection: {
          register: `${servers.apiUrl}/user/register`,
          userExists: `${servers.apiUrl}/user/exists`,
        },
      },
      user: {
        url: servers.apiUrl,
        collection: {
          getUser: `${servers.apiUrl}/user`,
          saveUserDetails: `${servers.apiUrl}/user/details`,
          updateUserInfos: `${servers.apiUrl}/user/infos`,
        },
      },
      image: {
        url: servers.apiUrl,
        collection: {
          uploadAvatar: `${servers.apiUrl}/user/upload/avatar`,
        },
      },
      theme: {
        url: servers.apiUrl,
        collection: {
          saveThemeToPage: `${servers.apiUrl}/themes/URI`,
        },
      },
      analytics: {
        url: servers.apiUrl,
        collection: {
          getLinksAnalytics: `${servers.apiUrl}/analytics/clicks`,
        },
      },
      page: {
        url: servers.apiUrl,
        collection: {
          uriExists: `${servers.apiUrl}/pages/uri/URI/exists`,
          userHasPage: `${servers.apiUrl}/pages/user/exists`,
          pageByUserId: `${servers.apiUrl}/pages/user`,
          pageByUri: `${servers.apiUrl}/pages/uri/URI`,
        },
      },
      button: {
        url: servers.apiUrl,
        collection: {
          saveButtonsToPage: `${servers.apiUrl}/buttons/URI`,
          editButton: `${servers.apiUrl}/buttons/BUTTONID`,
          deleteButton: `${servers.apiUrl}/buttons/BUTTONID`,
        },
      },
      link: {
        url: servers.apiUrl,
        collection: {
          saveLinksTopage: `${servers.apiUrl}/links/URI`,
          editLink: `${servers.apiUrl}/links/LINKID`,
          deleteLink: `${servers.apiUrl}/links/LINKID`,
        },
      },
    },
  };
}
