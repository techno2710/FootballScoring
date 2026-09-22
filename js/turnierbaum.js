let hold_lock = false;

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("toggle-hold");

    btn.addEventListener("click", () => {
        if(hold_lock === true)
        {
            hold_lock = false;
            document.getElementById("out-turnierbaum").classList.remove("gradient-green");
            document.getElementById("out-turnierbaum").classList.add("gradient-red");
        }
        if(hold_lock === false)
        {
            hold_lock = true;
            document.getElementById("out-turnierbaum").classList.remove("gradient-red");
            document.getElementById("out-turnierbaum").classList.add("gradient-green");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("toggle-turnierbaum");
    const wrapper = document.querySelector(".anim-wrapper-turnierbaum");

    btn.addEventListener("click", () => {
        wrapper.classList.toggle("active-turnierbaum");
    });
});

function plantTree()
{
    if(hold_lock === false)
    {
        return;
    }

    const dataForTree = joinGamesWithTeams();
    const items = document.querySelectorAll('.anim-item-turnierbaum');
    const circles = document.querySelectorAll('.anim-item-turnierbaum .circle[id]');

    const tree = {};

    items.forEach(item => {
        const id = item.id;
        if (!id) return;

        const match = id.match(/^([vhsf])(\d)([AB])([OT])$/);
        if (!match) return;

        const [, phase, index, side, type] = match;

        if (!tree[phase]) tree[phase] = {};
        if (!tree[phase][index]) tree[phase][index] = {};
        if (!tree[phase][index][side]) tree[phase][index][side] = {};

        tree[phase][index][side][type] = item;
        // type can be "T" or "O"
    });

    circles.forEach(circle => {
        const id = circle.id;
        if (!id) return;

        const match = id.match(/^([vhsf])(\d)([AB])O$/);
        if (!match) return;

        const [, phase, index, side] = match;

        if (!tree[phase]) tree[phase] = {};
        if (!tree[phase][index]) tree[phase][index] = {};
        if (!tree[phase][index][side]) tree[phase][index][side] = {};

        tree[phase][index][side].O = circle;
    });

    Object.keys(tree).forEach(phase => {
        Object.keys(tree[phase]).forEach(index => {
            Object.keys(tree[phase][index]).forEach(side => {
                const textEl = tree[phase][index][side]['T'];
                // const optionEl = tree[phase][index][side]['O'];

                if (textEl) {
                    const ellipse = textEl.querySelector('.ellipse');
                    if (ellipse) {
                        ellipse.textContent = ellipse.textContent.trim();
                    }
                }

                // Removed trimming of ellipse inside optionEl since O is a circle and does not contain .ellipse
            });
        });
    });

    addToTree(tree, dataForTree);
}

function addToTree(tree, dataForTree)
{
    if (!tree || typeof tree !== "object" || !dataForTree || !Array.isArray(dataForTree) || dataForTree.length === 0)
    {
        return;
    }

    const VTree = dataForTree.filter(dataForTree => dataForTree.modus ==="V");
    const HTree = dataForTree.filter(dataForTree => dataForTree.modus ==="H");
    const STree = dataForTree.filter(dataForTree => dataForTree.modus ==="S");
    const FTree = dataForTree.filter(dataForTree => dataForTree.modus ==="F");

    tree.v[1].A.T.querySelector("div").textContent = VTree[0].teamA.teamname;
    tree.v[1].B.T.querySelector("div").textContent = VTree[0].teamB.teamname;
    tree.v[2].A.T.querySelector("div").textContent = VTree[1].teamA.teamname;
    tree.v[2].B.T.querySelector("div").textContent = VTree[1].teamB.teamname;
    tree.v[3].A.T.querySelector("div").textContent = VTree[2].teamA.teamname;
    tree.v[3].B.T.querySelector("div").textContent = VTree[2].teamB.teamname;
    tree.v[4].A.T.querySelector("div").textContent = VTree[3].teamA.teamname;
    tree.v[4].B.T.querySelector("div").textContent = VTree[3].teamB.teamname;

    tree.h[1].A.T.querySelector("div").textContent = HTree[0].teamA.teamname;
    tree.h[1].B.T.querySelector("div").textContent = HTree[0].teamB.teamname;
    tree.h[2].A.T.querySelector("div").textContent = HTree[1].teamA.teamname;
    tree.h[2].B.T.querySelector("div").textContent = HTree[1].teamB.teamname;

    tree["s"][2].A.T.querySelector("div").textContent = STree[0].teamA.teamname;
    tree["s"][2].B.T.querySelector("div").textContent = STree[0].teamB.teamname;

    tree.f[1].A.T.querySelector("div").textContent = FTree[0].teamA.teamname;
    tree.f[1].B.T.querySelector("div").textContent = FTree[0].teamB.teamname;

    setColorsTurnierbaum(tree, VTree, HTree, STree, FTree);
}

function joinGamesWithTeams() {
    if (!Array.isArray(gameTAB) || !Array.isArray(teamTAB)) {
        return [];
    }

    // Lookup: teamname -> teamObjekt
    const teamMap = {};
    teamTAB.forEach(team => {
        if (team.teamname) {
            teamMap[team.teamname] = team;
        }
    });

    // Spiele anreichern
    return gameTAB.map(game => {
        const teamA = teamMap[game.teamnameA] || null;
        const teamB = teamMap[game.teamnameB] || null;

        return {
            ...game,
            organisationA: teamA ? teamA.organisation : null,
            organisationB: teamB ? teamB.organisation : null,
            teamA: teamA,
            teamB: teamB
        };
    });
}

function setCircle(treeBranch, part, side) {

    switch(treeBranch[part][side].organisation)
    {
        case("HTL"):
            return "gradient-blue";
        case("HAK"):
            return "gradient-orange";
        default:
            return "gradient-borange";
    }
}

function setTeam(treeBranch, part, side)
{
    switch(treeBranch[part][side].organisation)
    {
        case("HTL"):
            return "football-htl-right";
        case("HAK"):
            return "football-hak-right";
        default:
            return "football-hak-htl-right";
    }
}

function setColorsTurnierbaum(tree, VTree, HTree, STree, FTree)
{
    tree.v[1].A.O.classList.remove("gradient-borange", "gradient-blue", "gradient-orange");
    tree.v[1].B.O.classList.remove("gradient-borange", "gradient-blue", "gradient-orange");
    tree.v[2].A.O.classList.remove("gradient-borange", "gradient-blue", "gradient-orange");
    tree.v[2].B.O.classList.remove("gradient-borange", "gradient-blue", "gradient-orange");
    tree.v[3].A.O.classList.remove("gradient-borange", "gradient-blue", "gradient-orange");
    tree.v[3].B.O.classList.remove("gradient-borange", "gradient-blue", "gradient-orange");
    tree.v[4].A.O.classList.remove("gradient-borange", "gradient-blue", "gradient-orange");
    tree.v[4].B.O.classList.remove("gradient-borange", "gradient-blue", "gradient-orange");
    tree.h[1].A.O.classList.remove("gradient-borange", "gradient-blue", "gradient-orange");
    tree.h[1].B.O.classList.remove("gradient-borange", "gradient-blue", "gradient-orange");
    tree.h[2].A.O.classList.remove("gradient-borange", "gradient-blue", "gradient-orange");
    tree.h[2].B.O.classList.remove("gradient-borange", "gradient-blue", "gradient-orange");
    tree.v[1].A.T.querySelector("div").classList.remove("football-htl-right", "football-hak-right", "football-hak-htl-right");
    tree.v[1].B.T.querySelector("div").classList.remove("football-htl-right", "football-hak-right", "football-hak-htl-right");
    tree.v[2].A.T.querySelector("div").classList.remove("football-htl-right", "football-hak-right", "football-hak-htl-right");
    tree.v[2].B.T.querySelector("div").classList.remove("football-htl-right", "football-hak-right", "football-hak-htl-right");
    tree.v[3].A.T.querySelector("div").classList.remove("football-htl-right", "football-hak-right", "football-hak-htl-right");
    tree.v[3].B.T.querySelector("div").classList.remove("football-htl-right", "football-hak-right", "football-hak-htl-right");
    tree.v[4].A.T.querySelector("div").classList.remove("football-htl-right", "football-hak-right", "football-hak-htl-right");
    tree.v[4].B.T.querySelector("div").classList.remove("football-htl-right", "football-hak-right", "football-hak-htl-right");
    tree.h[1].A.T.querySelector("div").classList.remove("football-htl-right", "football-hak-right", "football-hak-htl-right");
    tree.h[1].B.T.querySelector("div").classList.remove("football-htl-right", "football-hak-right", "football-hak-htl-right");
    tree.h[2].A.T.querySelector("div").classList.remove("football-htl-right", "football-hak-right", "football-hak-htl-right");
    tree.h[2].B.T.querySelector("div").classList.remove("football-htl-right", "football-hak-right", "football-hak-htl-right");
    tree["s"][2].A.T.querySelector("div").classList.remove("football-htl-right", "football-hak-right", "football-hak-htl-right");
    tree["s"][2].B.T.querySelector("div").classList.remove("football-htl-right", "football-hak-right", "football-hak-htl-right");
    tree.f[1].A.T.querySelector("div").classList.remove("football-htl-right", "football-hak-right", "football-hak-htl-right");
    tree.f[1].B.T.querySelector("div").classList.remove("football-htl-right", "football-hak-right", "football-hak-htl-right");

    tree.v[1].A.O.classList.add(setCircle(VTree,0,"teamA"));
    tree.v[1].B.O.classList.add(setCircle(VTree,0,"teamB"));
    tree.v[2].A.O.classList.add(setCircle(VTree,1,"teamA"));
    tree.v[2].B.O.classList.add(setCircle(VTree,1,"teamB"));
    tree.v[3].A.O.classList.add(setCircle(VTree,2,"teamA"));
    tree.v[3].B.O.classList.add(setCircle(VTree,2,"teamB"));
    tree.v[4].A.O.classList.add(setCircle(VTree,3,"teamA"));
    tree.v[4].B.O.classList.add(setCircle(VTree,3,"teamB"));
    tree.h[1].A.O.classList.add(setCircle(HTree,0,"teamA"));
    tree.h[1].B.O.classList.add(setCircle(HTree,0,"teamB"));
    tree.h[2].A.O.classList.add(setCircle(HTree,1,"teamA"));
    tree.h[2].B.O.classList.add(setCircle(HTree,1,"teamB"));

    tree.v[1].A.T.querySelector("div").classList.add(setTeam(VTree,0,"teamA"));
    tree.v[1].B.T.querySelector("div").classList.add(setTeam(VTree,0,"teamB"));
    tree.v[2].A.T.querySelector("div").classList.add(setTeam(VTree,1,"teamA"));
    tree.v[2].B.T.querySelector("div").classList.add(setTeam(VTree,1,"teamB"));
    tree.v[3].A.T.querySelector("div").classList.add(setTeam(VTree,2,"teamA"));
    tree.v[3].B.T.querySelector("div").classList.add(setTeam(VTree,2,"teamB"));
    tree.v[4].A.T.querySelector("div").classList.add(setTeam(VTree,3,"teamA"));
    tree.v[4].B.T.querySelector("div").classList.add(setTeam(VTree,3,"teamB"));
    tree.h[1].A.T.querySelector("div").classList.add(setTeam(HTree,0,"teamA"));
    tree.h[1].B.T.querySelector("div").classList.add(setTeam(HTree,0,"teamB"));
    tree.h[2].A.T.querySelector("div").classList.add(setTeam(HTree,1,"teamA"));
    tree.h[2].B.T.querySelector("div").classList.add(setTeam(HTree,1,"teamB"));

    tree["s"][2].A.T.querySelector("div").classList.add(setTeam(STree,0,"teamA"));
    tree["s"][2].B.T.querySelector("div").classList.add(setTeam(STree,0,"teamB"));
    tree.f[1].A.T.querySelector("div").classList.add(setTeam(FTree,0,"teamA"));
    tree.f[1].B.T.querySelector("div").classList.add(setTeam(FTree,0,"teamB"));
}