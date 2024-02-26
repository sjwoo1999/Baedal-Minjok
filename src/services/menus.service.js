export class MenusService{
    constructor(menusRepository){
        this.menusRepository = menusRepository;
    }

    createMenu = async({userId, restaurantId, name, menuInfo, price, image})=>{

    }
}