export class DefaultConfig {
    home!: DefaultConfigHome;
    games!: DefaultConfigHomeGames[];
    friends!: DefaultConfigFriends;
    store!: DefaultConfigStore;
    streetFoods!: DefaultConfigStreetFoods;
    shared!: DefaultConfigStreetShared;
}

export class DefaultConfigHome {

}
export class DefaultConfigHomeGames {
    name = 'amatures'
    play_price = 0;
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
    can_show = false;
}
export class DefaultConfigStreetSharedHeaderUserCoins {
    can_show = false;
}
export class DefaultConfigStreetSharedHeaderUserInfo {
    can_show = false;
}
export class DefaultConfigStreetSharedHeaderUserTeam {
    can_show = false;
}

export class DefaultConfigStreetSharedFooter {
    store!: DefaultConfigStreetSharedFooterStore;
    friends!: DefaultConfigStreetSharedFooterFriends;
    street_foods!: DefaultConfigStreetSharedFooterStreetFoods;
    mini_games!: DefaultConfigStreetSharedFooterMiniGames;
}

export class DefaultConfigStreetSharedFooterStore {
    can_show = false;
}
export class DefaultConfigStreetSharedFooterFriends {
    can_show = false;
}
export class DefaultConfigStreetSharedFooterStreetFoods {
    can_show = false;
}
export class DefaultConfigStreetSharedFooterMiniGames {
    can_show = false;
}