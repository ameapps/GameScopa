export class DefaultConfig {
    home!: DefaultConfigHome;
    friends!: DefaultConfigFriends;
    store!: DefaultConfigStore;
    streetFoods!: DefaultConfigStreetFoods;
    shared!: DefaultConfigStreetShared;
}

export class DefaultConfigHome {

}
export class DefaultConfigFriends {

}
export class DefaultConfigStore {

}
export class DefaultConfigStreetFoods {

}
export class DefaultConfigStreetShared {
    header!: DefaultConfigStreetSharedHeader;
    footer!: DefaultConfigStreetSharedFooter;
}

export class DefaultConfigStreetSharedHeader {
    user_level!: DefaultConfigStreetSharedHeaderUserLevel;
    user_coins!: DefaultConfigStreetSharedHeaderUserCoins;
    user_info!: DefaultConfigStreetSharedHeaderUserInfo;
    user_team!: DefaultConfigStreetSharedHeaderUserTeam;
}

export class DefaultConfigStreetSharedHeaderUserLevel {
    canShow = false;
}
export class DefaultConfigStreetSharedHeaderUserCoins {
    canShow = false;
}
export class DefaultConfigStreetSharedHeaderUserInfo {
    canShow = false;
}
export class DefaultConfigStreetSharedHeaderUserTeam {
    canShow = false;
}

export class DefaultConfigStreetSharedFooter {
    store!: DefaultConfigStreetSharedFooterStore;
    friends!: DefaultConfigStreetSharedFooterFriends;
    street_foods!: DefaultConfigStreetSharedFooterStreetFoods;
    mini_games!: DefaultConfigStreetSharedFooterMiniGames;
}

export class DefaultConfigStreetSharedFooterStore {
    canShow = false;
}
export class DefaultConfigStreetSharedFooterFriends {
    canShow = false;
}
export class DefaultConfigStreetSharedFooterStreetFoods {
    canShow = false;
}
export class DefaultConfigStreetSharedFooterMiniGames {
    canShow = false;
}